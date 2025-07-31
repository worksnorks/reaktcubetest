// src/components/MenuPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { key: 'profile', label: 'Профиль', icon: '👤', path: '/profile' },
  { key: 'shop', label: 'Магазин', icon: '🛒', path: '/shop' },
  { key: 'market', label: 'Торговая площадка', icon: '💼', path: '/market' },

  { key: 'containers', label: 'Контейнеры', icon: '📦', path: '/containers' },
  { key: 'games', label: 'Игры', icon: '🎮', path: '/games' },
  { key: 'referral', label: 'Рефералка', icon: '🤝', path: '/referral' },

  { key: 'inventory', label: 'Инвентарь', icon: '🎒', path: '/inventory' },
  { key: 'info', label: 'Информация', icon: 'ℹ️', path: '/info' },
  { key: 'support', label: 'Поддержка', icon: '🆘', path: '/support' },

  { key: 'withdraw', label: 'Выводы', icon: '💸', path: '/withdraw' },
];

export default function MenuPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        minHeight: '80vh',
        paddingBottom: 80,
      }}
    >
      <h2>Меню</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginTop: 20,
        }}
      >
        {menuItems.map(({ key, label, icon, path }) => (
          <button
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 15px',
              borderRadius: 12,
              border: '1px solid #e0e0e0',
              backgroundColor: '#fafafa',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: '600',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              userSelect: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#e0f0ff';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,123,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#fafafa';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={() => navigate(path)}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>{icon}</div>
            <div>{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
