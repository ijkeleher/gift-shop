import { SHOW_CHECKOUT } from './types';

export const showCheckout = (bool) => dispatch => {
  dispatch({
    type: SHOW_CHECKOUT,
    payload: bool
  });
}
