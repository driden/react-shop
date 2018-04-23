// @flow
import React from 'react';
import axios, { type $AxiosXHR } from 'axios';
import Grid from '../components/Grid';
import { type Product } from '../types';

const BASE_URL = 'http://develop.plataforma5.la:3000/api';

type Props = {};

type State = {
  products: Product[],
  loading: boolean
}

export default class App extends React.Component<Props, State> {
  state = {
    products: [],
    loading: true,
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/products`)
      .then((res: $AxiosXHR<Product[]>): Product[] => res.data)
      .then((products: Product[]) => this.setState({ products, loading: false }));
  }

  render() {
    return (
      this.state.loading ?
        <div>Loading</div>
        :
        <div>
          <Grid products={this.state.products} />
        </div>
    );
  }
}
