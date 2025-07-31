// src/components/BottomNav.jsx
import React from 'react';

export default function BottomNav({ currentTab, setCurrentTab }) {
  const tabs = [
    { key: 'dice', label: 'Кубик' },
    { key: 'menu', label: 'Меню' },
    { key: 'settings', label: 'Настройки' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: '1px solid #ccc',
        background: '#f8f8f8',
        padding: '10px 0',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setCurrentTab(tab.key)}
          style={{
            background: 'none',
            border: 'none',
            padding: 10,
            cursor: 'pointer',
            color: currentTab === tab.key ? '#1976d2' : '#555',
            borderBottom:
              currentTab === tab.key ? '3px solid #1976d2' : 'none',
            fontSize: '16px',
          }}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
