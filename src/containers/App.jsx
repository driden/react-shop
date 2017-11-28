// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter, type ContextRouter } from 'react-router';
import { type Dispatch } from 'redux';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import ProductComponent from '../components/Product';
import Cart from './Cart';
import { type Product, type Category, type ReduxState } from '../types';
import s from './App.css';
import { getAllProducts, getAllCategories, receiveCategories, receiveProducts, addToCart, type Action } from '../actions';

type Props = {
  products: Product[],
  loading: boolean,
  categories: Category[],
  getProducts: () => void,
  getCategories: () => void,
  receiveProducts: (products: Product[]) => void,
  receiveCategories: (categories: Category[]) => void,
  addToCart: (product: ?Product) => void,
};

type State = {}

const mapStateToProps = (state: ReduxState) => ({
  products: state.products.items,
  loading: state.products.isLoading,
  categories: state.products.categories,
});

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProducts: () => dispatch(getAllProducts()),
    getCategories: () => dispatch(getAllCategories()),
    receiveProducts: (products: Product[]) => dispatch(receiveProducts(products)),
    receiveCategories: (categories: Category[]) => dispatch(receiveCategories(categories)),
    addToCart: (product: Product) => dispatch(addToCart(product)),
  };
}

class App extends React.Component<Props, State> {
  componentDidMount() {
    // this.props.getProducts();
    // this.props.getCategories();
    // Promise.all([axios.get(`${url}/products`), axios.get(`${url}/categories`)])
    //   .then(([products, categories]) => {
    //     this.props.receiveProducts(products.data);
    //     this.props.receiveCategories(categories.data);
    //   });
    this.props.getProducts();
    this.props.getCategories();
  }

  addProduct = () => {}

  isRowLoaded = ({ index }) => {
    console.log ('hello')
    return !!this.props.products[index]
  }

  loadMoreRows = () => {
    console.log('RUNMNING')
    return this.props.getProducts();
  }

  render() {
    return (
      this.props.loading ?
        <div>Loading...</div>
        :
        <div className={s.layout}>
          <div>
            <Sidebar
              addProduct={this.addProduct}
              categories={this.props.categories}
            />
          </div>
          <div>
            <Switch>
              <Route
                path="/products"
                exact
                render={(props: ContextRouter) => (
                  <Grid
                    products={this.props.products}
                    selectedCategory={Number(new URLSearchParams(props.location.search).get('category'))}
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    {...props}
                  />
                )}
              />
              <Route
                path="/products/:id"
                render={(props: ContextRouter) => {
                  const selectedProduct = this.props.products.find(product =>
                    String(product.id) === props.match.params.id);
                  return (
                    <ProductComponent
                      {...props}
                      product={selectedProduct}
                      addProductToCart={() => this.props.addToCart(selectedProduct)}
                    />
                );
              }}
              />
              <Route
                path="/cart"
                component={Cart}
              />
              <Redirect exact from="/" to="/products" />
              <Route render={() => <div>Page Not Found</div>} />
            </Switch>
          </div>
        </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
