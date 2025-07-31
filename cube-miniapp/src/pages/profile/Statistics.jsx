// src/components/profile/Statistics.jsx
import React from 'react';

export default function Statistics({ stats }) {
  const { totalRolls, totalGames, wins } = stats;

  return (
    <div
      style={{
        backgroundColor: '#f0f4ff',
        padding: '20px 24px',
        borderRadius: 16,
        boxShadow: '0 4px 15px rgba(30, 60, 150, 0.1)',
        color: '#223366',
        maxWidth: 400,
        margin: '0 auto 24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: 16, fontWeight: '700', fontSize: 20, textAlign: 'center' }}>
        Статистика
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
          gap: 20,
        }}
      >
        <StatItem label="Бросков" value={totalRolls} />
        <StatItem label="Игр" value={totalGames} />
        <StatItem label="Побед" value={wins} />
      </div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: '700',
          marginBottom: 6,
          color: '#1a3c91',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 14,
          color: '#5a6b9d',
          fontWeight: '600',
        }}
      >
        {label}
      </div>
    </div>
  );
}
