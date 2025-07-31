// src/components/inventory/Tabs.jsx
import React from 'react';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div style={tabsContainerStyle}>
      {tabs.map((tab) => (
        <button
          key={tab}
          style={{
            ...tabButtonStyle,
            ...(tab === activeTab ? activeTabStyle : {}),
          }}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

const tabsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  borderBottom: '2px solid #1976d2',
};

const tabButtonStyle = {
  padding: '12px 24px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: '600',
  color: '#555',
  transition: 'color 0.3s ease, border-bottom 0.3s ease',
};

const activeTabStyle = {
  color: '#1976d2',
  borderBottom: '3px solid #1976d2',
  fontWeight: '700',
};
