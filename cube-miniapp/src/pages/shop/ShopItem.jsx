import React from 'react';

export default function ShopItem({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: 12,
        padding: 10,
        textAlign: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img
        src={product.imageSmall}
        alt={product.name}
        style={{ width: '100%', height: 80, objectFit: 'contain', marginBottom: 8 }}
      />
      <div style={{ fontWeight: '600', marginBottom: 4 }}>{product.name}</div>
      <div style={{ color: '#145dbf', fontWeight: '700' }}>{product.price} 💰</div>
    </div>
  );
}
