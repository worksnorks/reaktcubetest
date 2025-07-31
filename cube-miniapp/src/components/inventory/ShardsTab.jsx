// src/components/inventory/ShardsTab.jsx
import React from 'react';

export default function ShardsTab({ shards, onExchange }) {
  return (
    <div style={gridStyle}>
      {shards.map((shard) => (
        <div key={shard.id} style={cardStyle}>
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{shard.name}</div>
          <div style={{ fontSize: 24, marginBottom: 8 }}>
            {shard.count} / {shard.needed}
          </div>
          {shard.count >= shard.needed && (
            <button style={exchangeBtnStyle} onClick={() => onExchange(shard)}>
              Обменять на гем
            </button>
          )}
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
  cursor: 'default',
  textAlign: 'center',
  userSelect: 'none',
};

const exchangeBtnStyle = {
  marginTop: 10,
  padding: '8px 12px',
  backgroundColor: '#4a90e2',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: '600',
};
