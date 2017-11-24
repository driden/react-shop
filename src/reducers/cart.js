// @flow
import { type CartAction } from '../actions';
import { type CartState } from '../types';


const initialState: CartState = {
  items: [],
};

function cart(state: CartState = initialState, action: CartAction) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { id } = action.product;
      const elem = state.items.findIndex(item => item.product.id === id);
      if (elem === -1) {
        return {
          ...state,
          items: [...state.items, {
            product: action.product,
            quantity: 1,
          }],
        };
      }
      return {
        items: [...state.items.slice(0, elem),
          {
            product: action.product,
            quantity: state.items[elem].quantity + 1,
          },
          ...state.items.slice(elem + 1),
        ],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: [...state.items.slice(0, action.index), ...state.items.slice(action.index + 1)],
      };
    default:
      return state;
  }
}

export default cart;
