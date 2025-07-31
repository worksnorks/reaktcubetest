// src/components/profile/UserInfo.jsx
import React from 'react';

export default function UserInfo({ nickname, avatarUrl, coins }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #4a90e2 0%, #145dbf 100%)',
        padding: '16px 24px',
        borderRadius: 16,
        boxShadow: '0 8px 20px rgba(20, 93, 191, 0.4)',
        marginBottom: 24,
        color: '#fff',
        userSelect: 'text',
        minWidth: 360,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
        <img
          src={avatarUrl}
          alt="avatar"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: '2px solid rgba(255,255,255,0.3)',
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontWeight: '700',
            fontSize: 22,
            lineHeight: 1.2,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
          }}
          title={nickname}
        >
          {nickname}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: 22,
          fontWeight: '600',
          textShadow: '0 1px 2px rgba(0,0,0,0.25)',
          marginLeft: 24,
          userSelect: 'none',
          gap: 8,
          flexShrink: 0,
        }}
        aria-label="Баланс монеток"
      >
        <span style={{ fontSize: 28, lineHeight: 1 }}>💰</span>
        <span>{coins.toLocaleString()}</span>
      </div>
    </div>
  );
}
