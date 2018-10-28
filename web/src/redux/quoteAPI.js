import appConfig from '../appConfig';

// eslint-disable-next-line no-undef
export default ({ products }) => fetch(`${appConfig.api}quote`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    products,
  }),
}).then(response => response.json());
