import React from 'react';
import ShopItem from './ShopItem';

export default function ShopList({ products, onSelect }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
      gap: 20,
    }}>
      {products.map(product => (
        <ShopItem key={product.id} product={product} onClick={() => onSelect(product)} />
      ))}
    </div>
  );
}
