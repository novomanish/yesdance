import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import QRCode from 'qrcode';
import {
  Button,
  CustomInput,
  Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';

import moment from 'moment';
import { getCustomersList } from '../redux/customerAPI';
import { getUpcomingProducts } from '../redux/productAPI';
import quoteAPI from '../redux/quoteAPI';
import { sendForPurchase } from '../redux/purchaseAPI';

class Home extends React.Component {
  state = {
    selectedOption: null,
    customer: {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      person_ind: null,
    },
    idQR: null,
    selectedProducts: [],
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCustomersList());
    dispatch(getUpcomingProducts());
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    const {
      fname, lname, phone, email, person_ind,
    } = selectedOption.value;
    this.setState({
      customer: {
        fname, lname, phone, email, person_ind,
      },
    });
    QRCode.toDataURL(`${person_ind}`)
      .then((idQR) => {
        this.setState({ idQR });
      })
      .catch((err) => {
        console.error(err);
      });
    console.log('Option selected:', selectedOption);
  }

  getOptions = () => this.props.customers.map(c => ({
    value: c,
    label: `${c.fname} ${c.lname || ''}`,
  }))

  addProduct(product) {
    const { selectedProducts } = this.state;
    selectedProducts.push(product);
    this.setState({ selectedProducts });
  }

  removeProduct(product) {
    const { selectedProducts } = this.state;
    for (let i = 0; i < selectedProducts.length; i += 1) {
      const p = selectedProducts[i];
      if (p.product_ind === product.product_ind) {
        selectedProducts.splice(i, 1);
      }
    }
    this.setState({ selectedProducts });
  }

  toggleProduct(product) {
    const { selectedProducts, customer } = this.state;
    return (event) => {
      if (event.target.checked) this.addProduct(product);
      else this.removeProduct(product);

      quoteAPI({ products: selectedProducts, customer }).then((response) => {
        this.setState({ quote: response });
      });
    };
  }

  handlePurchase() {
    const { dispatch } = this.props;
    dispatch(sendForPurchase(this.state.quote));
  }

  isProductSelected(product) {
    const found = this.state.selectedProducts.find(p => p.product_ind === product.product_ind);
    return found;
  }

  upcomingProducts() {
    return this.props.products.upcoming.map(product => (
      <div>
        <CustomInput
          type="checkbox"
          id={product.product_ind}
          label={`${product.event.event_name} ${moment(product.event.startdate).format('h:mm a')}`}
          onChange={this.toggleProduct(product)}
          checked={this.isProductSelected(product)}
        />
      </div>
    ));
  }

  renderQuote() {
    const { quote } = this.state;
    if (quote) {
      return (
        <div>
          {quote.products ? quote.products.map(p => (
            <div>
              {p.event ? p.event.event_name : null}
              {' '}
              {p.amount}
            </div>
          )) : null}
          <div>
            Total:
            {quote.total}
            <Button color="primary" onClick={this.handlePurchase.bind(this)}>Submit</Button>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      selectedOption, customer: {
        fname, lname, phone, email, idQR,
      },
    } = this.state;
    const readonly = !!selectedOption;

    return (
      <div>
        <div style={{ width: '50%', float: 'left' }}>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={this.getOptions()}
            placeholder="Search Customer..."
          />
          {idQR ? <img src={idQR} /> : null}
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText>First Name</InputGroupText>
            </InputGroupAddon>
            <Input type="text" value={fname} readOnly={readonly} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText>Last Name</InputGroupText>
            </InputGroupAddon>
            <Input type="text" value={lname} readOnly={readonly} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText>Phone</InputGroupText>
            </InputGroupAddon>
            <Input type="phone" value={phone} readOnly={readonly} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText>Email</InputGroupText>
            </InputGroupAddon>
            <Input type="email" value={email} readOnly={readonly} />
          </InputGroup>
        </div>
        <div style={{ width: '50%', float: 'left' }}>
          Products

          Upcoming:

          {this.upcomingProducts()}
        </div>
        <div>
          Quotation:
          {this.renderQuote()}
        </div>

      </div>
    );
  }
}

export default connect(
  state => ({
    customers: state.customers.data,
    products: state.products,
  }),
)(Home);
