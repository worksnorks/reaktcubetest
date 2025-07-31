// src/components/profile/ProfileCreationDate.jsx
import React from 'react';

export default function ProfileCreationDate({ date }) {
  const handleClick = () => {
    alert(`Дата создания профиля: ${date}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: '#e0f0ff',
        borderRadius: 12,
        padding: 8,
        width: 80,
        height: 48,
        cursor: 'pointer',
        boxShadow: '0 3px 8px rgba(0, 123, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        fontWeight: '600',
        color: '#0b2140',
        fontSize: 24,
        marginBottom: 24,
      }}
      title="Нажмите, чтобы увидеть дату создания профиля"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      📅
    </div>
  );
}
