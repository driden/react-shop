import { put, call, fork, takeEvery, all } from 'redux-saga/effects';
import axios, { type $AxiosXHR } from 'axios';
// @flow
import { GET_PRODUCTS, GET_CATEGORIES, receiveProducts, receiveCategories } from '../actions';
import { type Product, type Category } from '../types';
// const host = 'http://localhost:3000';
const host: string = 'http://develop.plataforma5.la:3000';

const getProductsApi = (startIndex: number, stopIndex: number): Promise<Product[] | Error> =>
  axios.get(`${host}/api/products/index?startIndex=${startIndex}&stopIndex=${stopIndex}`)
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
export function* getAllCategories() {
  const categories: $AxiosXHR<Category[]> = yield call(axios.get, `${host}/api/categories`);
  yield put(receiveCategories(categories.data));
}

let start = 0;
let end = 20;

export function* getProducts() {
  const products: Product[] = yield call(getProductsApi, start, end);
  yield put(receiveProducts(products));
  start += 20;
  end += 20;
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
  yield takeEvery(GET_PRODUCTS, getProducts);
}

export function* watchGetCategories() {
  yield takeEvery(GET_CATEGORIES, getAllCategories);
}

export default function* root() {
  yield all([
    fork(watchGetProducts),
    fork(watchGetCategories),
  ]);
}
