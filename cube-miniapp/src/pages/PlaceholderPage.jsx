// src/pages/PlaceholderPage.jsx
import React from 'react';

export default function PlaceholderPage({ label }) {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        minHeight: '80vh',
        padding: 20,
        textAlign: 'center',
        color: '#666',
      }}
    >
      <h2>{label}</h2>
      <p>Страница пока не реализована.</p>
    </div>
  );
}
