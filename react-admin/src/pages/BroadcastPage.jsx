import React, { useState } from 'react';

// Пример данных рассылок
const initialBroadcasts = [
  {
    id: 1,
    title: 'Новое обновление!',
    message: 'Добавили новые функции и исправили баги.',
    buttonText: 'Подробнее',
    buttonLink: 'https://example.com/update',
    sentAt: '2025-07-28 12:00',
    clicks: 120,
    recipients: 500,
  },
  {
    id: 2,
    title: 'Скидка 20%',
    message: 'Только сегодня! Получите скидку 20% на все предметы.',
    buttonText: 'Купить',
    buttonLink: 'https://example.com/shop',
    sentAt: '2025-07-25 09:00',
    clicks: 75,
    recipients: 400,
  },
];

export default function BroadcastPage() {
  const [broadcasts, setBroadcasts] = useState(initialBroadcasts);
  const [activeTab, setActiveTab] = useState('create');

  // Новая рассылка
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');

  const handleCreate = () => {
    if (!title.trim() || !message.trim()) {
      alert('Введите заголовок и сообщение');
      return;
    }
    const newBroadcast = {
      id: broadcasts.length + 1,
      title: title.trim(),
      message: message.trim(),
      buttonText: buttonText.trim(),
      buttonLink: buttonLink.trim(),
      sentAt: new Date().toISOString().slice(0,16).replace('T', ' '),
      clicks: 0,
      recipients: 0,
    };
    setBroadcasts([newBroadcast, ...broadcasts]);
    setTitle('');
    setMessage('');
    setButtonText('');
    setButtonLink('');
    alert('Рассылка создана (эмуляция отправки)');
  };

  return (
    <div>
      <h1>Рассылки</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('create')}
          style={{
            marginRight: 10,
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'create' ? '#3498db' : '#ccc',
            color: activeTab === 'create' ? 'white' : 'black',
            border: 'none',
            borderRadius: 4,
          }}
        >
          Создать рассылку
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'stats' ? '#3498db' : '#ccc',
            color: activeTab === 'stats' ? 'white' : 'black',
            border: 'none',
            borderRadius: 4,
          }}
        >
          Статистика рассылок
        </button>
      </div>

      {activeTab === 'create' && (
        <div style={{ maxWidth: 600 }}>
          <div style={{ marginBottom: 10 }}>
            <label>Заголовок:</label><br />
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Сообщение:</label><br />
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Текст кнопки (необязательно):</label><br />
            <input
              type="text"
              value={buttonText}
              onChange={e => setButtonText(e.target.value)}
              style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Ссылка кнопки (если есть):</label><br />
            <input
              type="url"
              value={buttonLink}
              onChange={e => setButtonLink(e.target.value)}
              style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={handleCreate}
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: 4 }}
          >
            Создать рассылку
          </button>
        </div>
      )}

      {activeTab === 'stats' && (
        <>
          {broadcasts.length === 0 ? (
            <p>Рассылки отсутствуют</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Заголовок</th>
                  <th style={thStyle}>Отправлено</th>
                  <th style={thStyle}>Получателей</th>
                  <th style={thStyle}>Клики по кнопке</th>
                  <th style={thStyle}>CTR (%)</th>
                </tr>
              </thead>
              <tbody>
                {broadcasts.map(({ id, title, sentAt, recipients, clicks }) => (
                  <tr key={id}>
                    <td style={tdStyle}>{title}</td>
                    <td style={tdStyle}>{sentAt}</td>
                    <td style={tdStyle}>{recipients}</td>
                    <td style={tdStyle}>{clicks}</td>
                    <td style={tdStyle}>{recipients ? ((clicks / recipients) * 100).toFixed(2) : '0.00'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: 8,
  backgroundColor: '#f0f0f0',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: 8,
};
