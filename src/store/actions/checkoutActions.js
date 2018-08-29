import { SHOW_CHECKOUT, OPEN_CHECKOUT, CLOSE_CHECKOUT } from './types';

//import persistentCart from '../../persistentCart';

export const showCheckout = (bool) => dispatch => {
  dispatch({
    type: SHOW_CHECKOUT,
    payload: bool
  });
}

export const openCheckout = () => dispatch => {
    dispatch({
      type: OPEN_CHECKOUT,
      payload: true
    });
  }

    export const closeCheckout = () => dispatch => {
      dispatch({
        type: CLOSE_CHECKOUT,
        payload: false
      });

}
