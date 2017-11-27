// @flow
import * as React from 'react';
import { type ContextRouter } from 'react-router';
import { 
  Collection,
  AutoSizer
} from 'react-virtualized';
import Item from './Item';
import { type Product } from '../types';
import s from './Grid.css';
import 'react-virtualized/styles.css'; // only needs to be imported once


function cellSizeAndPositionGetter ({ index }) {
  return {
    height: 400,
    width: 250,
    x: index%3 * 300,
    y: Math.floor(index/3) * 300,
  }
}

const Grid = ({
  products,
  selectedCategory,
  ...props
}: {
  products: Product[],
  selectedCategory: ?number,
  ...ContextRouter,
}) => {
  const filterProducts = products.filter(product => !selectedCategory || product.categoryId === selectedCategory)
  return (
      <AutoSizer>
        {({ width, height }) => (
          <Collection
          height={height}
          cellCount={filterProducts.length}
          width={width}
          cellSizeAndPositionGetter={cellSizeAndPositionGetter}
          cellRenderer={({ key, index, style }) => (
              <Item key={key} style={style} {...props} product={filterProducts[index]} /> 
          )} 
          />
        )}
      </AutoSizer>
  );
};

export default Grid;
