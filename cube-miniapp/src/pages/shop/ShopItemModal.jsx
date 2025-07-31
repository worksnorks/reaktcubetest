import React from 'react';

export default function ShopItemModal({ product, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 24,
          maxWidth: 400,
          width: '90%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            fontWeight: '700',
            color: '#999',
          }}
          aria-label="Закрыть"
        >
          ×
        </button>

        <img
          src={product.imageLarge}
          alt={product.name}
          style={{ width: '100%', borderRadius: 12, marginBottom: 16 }}
        />

        <h2 style={{ margin: '0 0 12px 0' }}>{product.name}</h2>
        <p style={{ marginBottom: 20, color: '#555' }}>{product.description}</p>

        <button
          onClick={() => alert(`Купить товар "${product.name}" за ${product.price} монет`)}
          style={{
            backgroundColor: '#145dbf',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 12,
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Купить за {product.price} 💰
        </button>
      </div>
    </div>
  );
}
