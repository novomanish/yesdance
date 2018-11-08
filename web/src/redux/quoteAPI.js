import appConfig from '../appConfig';

// eslint-disable-next-line no-undef
export default ({ products, customer }) => fetch(`${appConfig.api}quote`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    products,
    customer,
  }),
}).then(response => response.json());
