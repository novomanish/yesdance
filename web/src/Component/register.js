import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
  Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';

import { getCustomersList } from '../redux/customerAction';

class Register extends React.Component {
  state = {
    selectedOption: null,
    fname: '',
    lname: '',
    phone: '',
    email: '',
    id: null,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCustomersList());
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    const {
      fname, lname, phone, email, id,
    } = selectedOption.value;
    this.setState({
      fname, lname, phone, email, id,
    });
    console.log('Option selected:', selectedOption);
  }

  getOptions = () => this.props.customers.map(c => ({
    value: c,
    label: `${c.fname} ${c.lname || ''}`,
  }))

  render() {
    const {
      selectedOption, fname, lname, phone, email,
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
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText>First Name</InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="fname" value={fname} readOnly={readonly} />
          </InputGroup>
          <Input type="text" name="fname" value={lname} placeholder="Last Name" readOnly={readonly} />
          <Input type="phone" name="fname" value={phone} placeholder="Phone" readOnly={readonly} />
          <Input type="email" name="fname" value={email} placeholder="Email" readOnly={readonly} />
        </div>
        <div style={{ width: '50%', float: 'left' }}>right</div>

      </div>
    );
  }
}

export default connect(
  state => ({
    customers: state.customers.data,
  }),
)(Register);
