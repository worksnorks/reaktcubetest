// src/components/profile/FriendsList.jsx
import React from 'react';

function truncateName(name, maxLength = 6) {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength) + '…';
}

export default function FriendsList({ friends }) {
  // Ограничим максимум 10 друзей для показа
  const visibleFriends = friends.slice(0, 10);

  return (
    <div
      style={{
        backgroundColor: '#f0f4ff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 16, color: '#2c3e50' }}>Друзья</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}
      >
        {visibleFriends.map((friend, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: '#ffffff',
              padding: '8px 12px',
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            title={friend}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#4a90e2',
                color: '#fff',
                fontWeight: '700',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 16,
                userSelect: 'none',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              {friend.slice(0, 1)}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#34495e',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexGrow: 1,
              }}
            >
              {truncateName(friend)}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        style={{
          backgroundColor: '#4a90e2',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: 12,
          border: 'none',
          fontWeight: '700',
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(74, 144, 226, 0.4)',
          transition: 'background-color 0.3s ease',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#357ABD')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a90e2')}
        onClick={() => alert('Добавить друга')}
      >
        + Добавить друга
      </button>
    </div>
  );
}
