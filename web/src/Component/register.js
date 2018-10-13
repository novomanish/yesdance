import React from 'react';
import { connect } from 'react-redux';
import { getCustomersList } from '../redux/customerAction';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCustomersList());
  }

  render() {
    return (
      <div>
      Hello
        {' '}
        {this.props.customers[0] && this.props.customers[0].fname}
      </div>
    );
  }
}

export default connect(
  state => ({
    customers: state.customers.data,
  }),
)(Register);
