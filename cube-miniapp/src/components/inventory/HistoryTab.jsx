// src/components/inventory/HistoryTab.jsx
import React from 'react';

export default function HistoryTab({ logs }) {
  return (
    <div>
      {logs.map(log => (
        <div key={log.id} style={logItemStyle}>
          <div>{log.text}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{log.date}</div>
        </div>
      ))}
    </div>
  );
}

const logItemStyle = {
  padding: '10px 15px',
  borderBottom: '1px solid #ddd',
  userSelect: 'none',
};
