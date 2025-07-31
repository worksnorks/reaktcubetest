import React, { useState } from 'react';

export default function ReferralLink({ link }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({ title: 'Реферальная ссылка', url: link }).catch(() => {});
    } else {
      alert('Ваш браузер не поддерживает Web Share API');
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontWeight: 'bold' }}>Ваша реферальная ссылка:</label>
      <div
        style={{
          backgroundColor: '#f0f4ff',
          padding: 10,
          borderRadius: 8,
          marginTop: 8,
          wordBreak: 'break-all',
          userSelect: 'all',
          cursor: 'text',
        }}
        onClick={copyToClipboard}
        title="Кликните, чтобы скопировать"
      >
        {link}
      </div>
      <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
        <button onClick={copyToClipboard} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          {copied ? 'Скопировано!' : 'Скопировать'}
        </button>
        <button onClick={shareLink} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Поделиться
        </button>
      </div>
    </div>
  );
}
