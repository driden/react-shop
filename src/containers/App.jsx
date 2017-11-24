// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter, type ContextRouter } from 'react-router';
import { type Dispatch } from 'redux';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import ProductComponent from '../components/Product';
<<<<<<< HEAD
import { type Product, type Category } from '../types';
=======
import Cart from './Cart';
import { type Product, type Category, type ReduxState } from '../types';
>>>>>>> 3facb92f6108b8eeb552d872f9ba403d162e91e1
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

<<<<<<< HEAD
<<<<<<< HEAD
  addProductToCart = (productId: ?string) => {
    axios.post('http://develop.plataforma5.la:3000/api/cart/', { productId });
  }
=======
  addProduct = () => {}
>>>>>>> 3facb92f6108b8eeb552d872f9ba403d162e91e1

=======
>>>>>>> d82b476fae166b5378ecb57f5b7354fbe94c140c
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
                    {...props}
                  />
                )}
              />
              <Route
                path="/products/:id"
<<<<<<< HEAD
                render={(props: ContextRouter) => (
                  <ProductComponent
                    {...props}
                    product={this.state.products.find(product =>
                      String(product.id) === props.match.params.id)}
                  />
                )}
=======
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
>>>>>>> 3facb92f6108b8eeb552d872f9ba403d162e91e1
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
