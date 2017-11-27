// @flow
import React from 'react';
import { type Match } from 'react-router';
import { Link } from 'react-router-dom';
import { type Product } from '../types';
import s from './Item.css';

const Item = ({ product, match, style }: { product: Product, match: Match, style: Object }) => (
  <Link style={style} to={`${match.url}/${String(product.id)}`}>
    <div>
      <img style={{ width: '100%', maxHeight: 200 }} src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  </Link>
);

export default Item;
