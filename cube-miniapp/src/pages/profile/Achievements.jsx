// src/components/profile/Achievements.jsx
import React from 'react';

export default function Achievements({ achievements }) {
  return (
    <div
      style={{
        backgroundColor: '#fff8e1',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        boxShadow: '0 4px 12px rgba(255, 193, 7, 0.2)',
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        fontSize: 32,
        userSelect: 'none',
      }}
      title={achievements.join(', ')} // подсказка со всеми названиями
    >
      {achievements.map((emoji, index) => (
        <span key={index} role="img" aria-label={`Achievement ${index + 1}`}>
          {emoji}
        </span>
      ))}
    </div>
  );
}
