// @flow
import * as React from 'react';
import { type ContextRouter } from 'react-router';
import { 
  Collection,
  AutoSizer,
  InfiniteLoader
} from 'react-virtualized';
import Item from './Item';
import { type Product } from '../types';
import s from './Grid.css';
import 'react-virtualized/styles.css'; // only needs to be imported once


function cellSizeAndPositionGetter ({ index }) {
  return {
    height: 400,
    width: 250,
    x: index%4 * 300,
    y: Math.floor(index/4) * 300,
  }
}

const Grid = ({
  products,
  selectedCategory,
  isRowLoaded,
  loadMoreRows,
  ...props
}: {
  products: Product[],
  selectedCategory: ?number,
  isRowLoaded: ({ index: number }) => boolean,
  loadMoreRows: () => void,
  ...ContextRouter,
}) => {
  const filterProducts = products.filter(product => !selectedCategory || product.categoryId === selectedCategory)
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={112}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer
        ref={registerChild}
        >
          {({ width, height }) => (
              <Collection
              height={height}
              onCellRendered={onRowsRendered}
              cellCount={filterProducts.length}
              width={width}
              cellSizeAndPositionGetter={cellSizeAndPositionGetter}
              cellRenderer={({ key, index, style }) => (
                  <Item key={key} style={style} {...props} product={filterProducts[index]} /> 
              )} 
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
  );
};

export default Grid;
