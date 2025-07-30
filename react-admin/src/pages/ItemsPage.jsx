import React, { useState } from 'react';

const tabs = [
  { key: 'all', label: 'Все предметы' },
  { key: 'shop', label: 'Магазин' },
  { key: 'fragments', label: 'Осколки' },
  { key: 'coins', label: 'Монетки' },
  { key: 'usdt', label: 'USDT' },
  { key: 'cube', label: 'Кубик' },
  { key: 'avatars', label: 'Аватарки' },
];

// Пример пустого массива для каждого типа
const itemsData = {
  all: [],
  shop: [],
  fragments: [],
  coins: [],
  usdt: [],
  cube: [],
  avatars: [],
};

const thStyle = {
  border: '1px solid #ccc',
  padding: 8,
  backgroundColor: '#f7f7f7',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: 8,
  textAlign: 'center',
};

export default function ItemsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const items = itemsData[activeTab] || [];

  return (
    <div>
      <h1>Предметы</h1>

      <div style={{ marginBottom: 20 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              marginRight: 10,
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor: activeTab === tab.key ? '#3498db' : '#ccc',
              color: activeTab === tab.key ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Название</th>
            <th style={thStyle}>Категория</th>
            <th style={thStyle}>Цена</th>
            <th style={thStyle}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: 20, textAlign: 'center' }}>
                Нет предметов в этой категории.
              </td>
            </tr>
          ) : (
            items.map(item => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.category}</td>
                <td style={tdStyle}>{item.price}</td>
                <td style={tdStyle}>
                  {/* Добавьте кнопки управления по необходимости */}
                  <button>Управление</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
