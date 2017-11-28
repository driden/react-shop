// @flow
import * as React from 'react';
import { type ContextRouter } from 'react-router';
import { 
  List,
  WindowScroller,
  InfiniteLoader,
} from 'react-virtualized';
import Item from './Item';
import { type Product } from '../types';
import s from './Grid.css';
import 'react-virtualized/styles.css'; // only needs to be imported once

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
              <List
              ref={registerChild}
              autoHeight
              height={800}
              width={800}
              onRowsRendered={onRowsRendered}
              rowCount={112}
              rowHeight={200}
                rowRenderer={({ key, index, style }) => (
                  filterProducts[index] ?
                    <Item key={key} style={style} {...props} product={filterProducts[index]} />
                    : null 
                )} 
              />
        )}
      </InfiniteLoader>
  );
};

export default Grid;
