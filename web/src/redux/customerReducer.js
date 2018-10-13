import { GET_CUSTOMER_COMPLETE } from './customerAction';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_COMPLETE: {
      console.log(action);
      return { ...state, data: action.payload };
    }
    default:
      return initialState;
  }
}
