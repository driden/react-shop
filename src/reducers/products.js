// @flow
import { type ProductAction } from '../actions';
import { type ProductState } from '../types';


const initialState: ProductState = {
  items: [],
  categories: [],
  isLoading: false,
};

function products(state: ProductState = initialState, action: ProductAction) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        isLoading: true,
      };
    case 'RECEIVE_PRODUCTS':
      return {
        ...state,
        items: action.products,
        isLoading: false,
      };
    case 'GET_ALL_CATEGORIES':
      return {
        ...state,
        isLoading: true,
      };
    case 'RECEIVE_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default products;
