import { FETCH_PRODUCTS } from './types';
import axios from 'axios';


// const productsAPI = "https://react-shopping-cart-67954.firebaseio.com/products.json";
<<<<<<< HEAD
const productsAPI = "/api/products";
=======

//const productsAPI = "http://localhost:8001/api/products";

//const productsAPI = "https://api.myjson.com/bins/15qhx0";
>>>>>>> dev_branch

// const productsAPI = "https://storage.googleapis.com/rmit-giftshop/products.json";


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
      let {sizeProducts, genderProducts, typeProducts, freeShipping} = "";

      if(!!filters && filters.length > 0){
        sizeProducts = products.filter( p => filters.find( f => p.availableSizes.find( size => size === f) ) )
        genderProducts = products.filter( p => filters.find( f => p.availableGenders.find( gender => gender === f) ) )
        typeProducts = products.filter( p => filters.find( f => p.availableTypes.find( type => type === f) ) )
        freeShipping = products.filter( p => filters.find( ship => ship === 'Free' ) )

        if (Array.isArray(sizeProducts) && sizeProducts.length) {
          products = products.filter( p => filters.find( f => p.availableSizes.find( size => size === f) ) )
        }
        if (Array.isArray(genderProducts) && genderProducts.length) {
          products = products.filter( p => filters.find( f => p.availableGenders.find( gender => gender === f) ) )
        }
        if (Array.isArray(typeProducts) && typeProducts.length) {
          products = products.filter( p => filters.find( f => p.availableTypes.find( type => type === f) ) )
        }
        if (Array.isArray(freeShipping) && freeShipping.length) {
          products = products.filter( p => filters.find( f => p.isFreeShipping === true) )
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
