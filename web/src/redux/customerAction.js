/* eslint-disable no-undef */
export const GET_CUSTOMER_COMPLETE = 'GET_CUSTOMER_COMPLETE';

export const getCustomersList = () => fetch('http://localhost:3000/api/customer')
  .then(response => response.json())
  .then(data => ({
    type: GET_CUSTOMER_COMPLETE,
    payload: data,
  }));

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
