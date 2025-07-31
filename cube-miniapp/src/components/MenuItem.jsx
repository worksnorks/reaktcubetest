import React from 'react';

export default function MenuItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 15,
        border: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: '600',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        userSelect: 'none',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#9747FF';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = '#e0e0e0';
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 8 }}>{icon}</div>
      <div>{label}</div>
    </button>
  );
}
