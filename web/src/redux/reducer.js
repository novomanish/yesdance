import { combineReducers } from 'redux';
import customers from './customerAPI';
import products from './productAPI';

export default combineReducers({
  customers,
  products,
});
