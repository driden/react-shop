// @flow
export type Product = {
  name: string,
  id?: number,
  price: string,
  image: string,
  categoryId: ?number,
  availability: boolean,
  description: string,
};

export type Category = {
  name: string,
  id: number,
};

export type CartItem = {
  product: Product,
  quantity: number
}

export type CartState = {
  items: CartItem[]
}
export type ProductState = {
  items: Product[],
  categories: Category[],
  isLoading: boolean
}

export type ReduxState = {
  cart: CartState,
  products: ProductState,
}
