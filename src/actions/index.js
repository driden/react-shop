// @flow
import { type Product, type Category } from '../types';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const GET_CATEGORIES = 'GET_ALL_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';


export function getAllProducts() {
  return {
    type: GET_PRODUCTS,
  };
}

export function receiveProducts(products: Product[]) {
  return {
    type: RECEIVE_PRODUCTS,
    products,
  };
}

export function getAllCategories() {
  return {
    type: GET_CATEGORIES,
  };
}

export function receiveCategories(categories: Category[]) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}

export function addToCart(product: Product) {
  return {
    type: ADD_TO_CART,
    product,
  };
}


export function removeFromCart(index: number) {
  return {
    type: REMOVE_FROM_CART,
    index,
  };
}

type GetAllProductsAction = {
  type: 'GET_PRODUCTS',
};

type GetAllCategoriesAction = {
  type: 'GET_ALL_CATEGORIES',
}

type ReceiveCategoriesActions = {
  type: 'RECEIVE_CATEGORIES',
  categories: Category[],
};

type ReceiveProductsAction = {
  type: 'RECEIVE_PRODUCTS',
  products: Product[],
}

type AddToCartAction = {
  type: 'ADD_TO_CART',
  product: Product,
};
type RemoveFromCartAction = {
  type: 'REMOVE_FROM_CART',
  index: number,
}

export type ProductAction =
  GetAllProductsAction |
  GetAllCategoriesAction |
  ReceiveCategoriesActions |
  ReceiveProductsAction

export type CartAction = AddToCartAction | RemoveFromCartAction

export type Action = ProductAction | CartAction
