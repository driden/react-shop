// @flow
import * as React from 'react';
import { type ContextRouter } from 'react-router';
import { 
  List,
  WindowScroller,
  InfiniteLoader,
  AutoSizer,
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
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={registerChild}
              height={height}
              width={width}
              onRowsRendered={onRowsRendered}
              rowCount={filterProducts.length}
              rowHeight={400}
              rowRenderer={({ key, index, style }) => (
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
