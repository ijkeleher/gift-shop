import { SHOW_CHECKOUT } from '../actions/types';


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
    default:
      return state;
  }
}
