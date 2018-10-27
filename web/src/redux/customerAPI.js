/* eslint-disable no-undef */
export const GET_CUSTOMER_START = 'GET_CUSTOMER_START';
export const GET_CUSTOMER_COMPLETE = 'GET_CUSTOMER_COMPLETE';

export function getCustomersList() {
  return (dispatch) => {
    fetch('http://localhost:3000/api/customer')
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: GET_CUSTOMER_COMPLETE,
          payload: data,
        });
        return data;
      });
    return { type: GET_CUSTOMER_START };
  };
}

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_COMPLETE: {
      return { ...state, data: action.payload };
    }
    default:
      return initialState;
  }
}
