import React, { useState } from 'react';

const tabs = [
  { key: 'users', label: 'Пользователи' },
  { key: 'finance', label: 'Финансы' },
];

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div>
      <h1>Статистика</h1>

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

      {activeTab === 'users' && (
        <div>
          <h2>Статистика пользователей</h2>
          <p>Здесь будет информация и графики по пользователям.</p>
          {/* Добавим сюда таблицы, графики, метрики и т.д. */}
        </div>
      )}

      {activeTab === 'finance' && (
        <div>
          <h2>Финансовая статистика</h2>
          <p>Здесь будет информация о финансах: доходы, расходы, транзакции.</p>
          {/* Добавим таблицы, диаграммы, сводки по финансам */}
        </div>
      )}
    </div>
  );
}
