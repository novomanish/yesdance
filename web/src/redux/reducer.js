import { combineReducers } from 'redux';
import customers from './customerAPI';
import products from './productAPI';
import purchase from './purchaseAPI';

export default combineReducers({
  customers,
  products,
  purchase,
});
