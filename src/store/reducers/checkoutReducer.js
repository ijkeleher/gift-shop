import { SHOW_CHECKOUT, OPEN_CHECKOUT, CLOSE_CHECKOUT } from '../actions/types';


const initialState = {
  item: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_CHECKOUT:
      return {
        ...state,
        item: action.payload
      };
    case OPEN_CHECKOUT:
      return {
        ...state,
        item: action.payload
      };
    case CLOSE_CHECKOUT:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
