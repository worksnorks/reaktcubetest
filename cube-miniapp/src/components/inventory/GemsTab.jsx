// src/components/inventory/GemsTab.jsx
import React from 'react';

export default function GemsTab({ gems, onSelect }) {
  return (
    <div style={gridStyle}>
      {gems.map((gem) => (
        <div
          key={gem.id}
          style={cardStyle}
          onClick={() => onSelect(gem)}
        >
          <img src={gem.image} alt={gem.name} style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />
          <div style={{ fontWeight: 'bold' }}>{gem.name}</div>
          <div>Цена: {gem.price} монет</div>
        </div>
      ))}
    </div>
  );
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 20,
  marginTop: 20,
};

const cardStyle = {
  backgroundColor: '#f7f9fc',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  textAlign: 'center',
  userSelect: 'none',
};
