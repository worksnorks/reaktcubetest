// src/components/BalanceRolls.jsx
import React from 'react';

export default function BalanceRolls({ coins, rolls, maxRolls }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        fontSize: 22,
        fontWeight: '600',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span role="img" aria-label="coins" style={{ fontSize: 28 }}>
          💰
        </span>
        <span>{coins}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span role="img" aria-label="dice" style={{ fontSize: 28 }}>
          🎲
        </span>
        <span>
          {rolls} / {maxRolls}
        </span>
      </div>
    </div>
  );
}
