// src/components/inventory/GemModal.jsx
import React from 'react';

export default function GemModal({ gem, onClose, onSell, onWithdraw }) {
  if (!gem) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <img src={gem.image} alt={gem.name} style={{ width: 150, borderRadius: 12 }} />
        <h2>{gem.name}</h2>
        <p>{gem.description}</p>
        <p>Цена: {gem.price} монет</p>
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-around' }}>
          <button style={btnStyle} onClick={() => onSell(gem)}>Продать</button>
          <button style={btnStyle} onClick={() => onWithdraw(gem)}>Вывести</button>
          <button style={{ ...btnStyle, backgroundColor: '#ccc', color: '#444' }} onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 24,
  width: 320,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
};

const btnStyle = {
  padding: '10px 20px',
  backgroundColor: '#1976d2',
  border: 'none',
  borderRadius: 8,
  color: '#fff',
  fontWeight: '600',
  cursor: 'pointer',
};
