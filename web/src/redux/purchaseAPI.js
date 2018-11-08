import appConfig from '../appConfig';

export const POST_PURCHASE_START = 'POST_PURCHASE_START';
export const POST_PURCHASE_COMPLETE = 'POST_PURCHASE_COMPLETE';

export function sendForPurchase(quotation) {
  return (dispatch) => {
    // eslint-disable-next-line no-undef
    fetch(`${appConfig.api}purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(quotation),
    })
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: POST_PURCHASE_COMPLETE,
          payload: data,
        });
        return data;
      });
    return { type: POST_PURCHASE_START };
  };
}

const initialState = {
  upcoming: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_PURCHASE_COMPLETE: {
      return { ...state, purchaseCompleted: true };
    }
    default:
      return state;
  }
}
