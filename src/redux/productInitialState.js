import allProduct from 'db/allProducts.json';

const productInitialState = {
  allProduct: allProduct,
  products: null,
  date: null,
  consumed: 0,
  reports: null,
};

export default productInitialState;