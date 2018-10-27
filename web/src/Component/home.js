import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import QRCode from 'qrcode';
import {
  Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';

import { getCustomersList } from '../redux/customerAPI';
import { getUpcomingProducts } from '../redux/productAPI';

class Home extends React.Component {
  state = {
    selectedOption: null,
    fname: '',
    lname: '',
    phone: '',
    email: '',
    id: null,
    idQR: null,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCustomersList());
    dispatch(getUpcomingProducts());
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    const {
      fname, lname, phone, email, id,
    } = selectedOption.value;
    this.setState({
      fname, lname, phone, email, id,
    });
    QRCode.toDataURL(`${id}`)
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

  upcomingProducts() {
    return this.props.products.upcoming.map(product => (
      <fragment>
        {product.event_name}
        {(new Date(product.startdate)).toString()}
      </fragment>
    ));
  }

  render() {
    const {
      selectedOption, fname, lname, phone, email, idQR,
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
