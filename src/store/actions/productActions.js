import { FETCH_PRODUCTS } from './types';
import axios from 'axios';


//const productsAPI = "https://react-shopping-cart-67954.firebaseio.com/products.json";
const productsAPI = "http://localhost:8001/api/products";

const compare = {
  'lowestprice': (a, b) => {
    if (a.price < b.price)
      return -1;
    if (a.price > b.price)
      return 1;
    return 0;
  },
  'highestprice': (a, b) => {
    if (a.price > b.price)
      return -1;
    if (a.price < b.price)
      return 1;
    return 0;
  }
}

export const fetchProducts = (filters, sortBy, callback) => dispatch => {

  axios.get(productsAPI)
    .then(res => {
      let { products } = res.data;
      let {sizeProducts, colourProducts} = "";

      if(!!filters && filters.length > 0){
        sizeProducts = products.filter( p => filters.find( f => p.availableSizes.find( size => size === f) ) )
        colourProducts = products.filter( p => filters.find( f => p.availableColours.find( size => size === f) ) )

        if (Array.isArray(sizeProducts) && sizeProducts.length) {
          products = products.filter( p => filters.find( f => p.availableSizes.find( size => size === f) ) )
        }
        if (Array.isArray(colourProducts) && colourProducts.length) {
          products = products.filter( p => filters.find( f => p.availableColours.find( size => size === f) ) )
        }
      }

      if(!!sortBy){
        products = products.sort(compare[sortBy]);
      }

      if(!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });

    })
    .catch(err => {
      console.log(err);
      throw new Error('Could not fetch products. Try again later.');
    });
}
