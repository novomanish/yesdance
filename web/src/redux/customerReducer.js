const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GET_CUSTOMERS_COMPLETE': {
      return {...state};
    }
    default:
      return initialState;
  }
}