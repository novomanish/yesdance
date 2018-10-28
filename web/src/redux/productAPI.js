export const GET_UPCOMING_PRODUCT_START = 'GET_UPCOMING_PRODUCT_START';
export const GET_UPCOMING_PRODUCT_COMPLETE = 'GET_UPCOMING_PRODUCT_COMPLETE';

export function getUpcomingProducts() {
  return (dispatch) => {
    // eslint-disable-next-line no-undef
    fetch('http://localhost:3000/api/product/upcoming')
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: GET_UPCOMING_PRODUCT_COMPLETE,
          payload: data,
        });
        return data;
      });
    return { type: GET_UPCOMING_PRODUCT_START };
  };
}

const initialState = {
  upcoming: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_UPCOMING_PRODUCT_COMPLETE: {
      return { ...state, upcoming: action.payload };
    }
    default:
      return state;
  }
}
