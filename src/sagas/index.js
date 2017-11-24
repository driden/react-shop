import { put, call, fork, takeEvery, all } from 'redux-saga/effects';
import axios, { type $AxiosXHR } from 'axios';
// @flow
import { GET_PRODUCTS, receiveProducts, receiveCategories } from '../actions';
import { type Product, type Category } from '../types';
// const host = 'http://localhost:3000';
const host: string = 'http://develop.plataforma5.la:3000';

const getAllProductsAPI: () => Promise<Product[] | Error> = () => axios.get(`${host}/api/products`)
  .then((response: $AxiosXHR<Product[]>) => response.data)
  .catch((err: Error) => {
    throw err;
  });

// const getAllCategoriesAPI = () => axios.get(`${host}/api/categories`, {
//       headers: {
//         'Accept': 'application/json'
//       }
//     }).then(response => response.data)
//     .catch(err => {
//       throw err;
//     });

// nuestro Saga: este realizará la accion asincrónica
export function* getAllProductsAndCategories() {
  const products: Product[] = yield call(getAllProductsAPI);
  const categories: $AxiosXHR<Category[]> = yield call(axios.get, `${host}/api/categories`);
  yield [
    put(receiveProducts(products)),
    put(receiveCategories(categories.data)),
  ];
}

// export function* getAllProducts() {
//   const products = yield call(getAllProductsAPI);
//   yield take(RECEIVE_CATEGORIES);
//   yield put(receiveProducts(products));
// }

// export function* getAllCategories() {
//   const categories = yield call(getAllCategoriesAPI);
//   yield put(receiveCategories(categories));
// }

// El watcher Saga: va a invocar a getAllProductsAndCategories en cada GET_PRODUCTS
export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS, getAllProductsAndCategories);
}

export default function* root() {
  yield all([
    fork(watchGetProducts),
  ]);
}
