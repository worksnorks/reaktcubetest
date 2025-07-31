import React, { useState } from 'react';

// Пример данных платежных шлюзов
const initialGateways = [
  {
    id: 1,
    name: 'PayPal',
    enabled: true,
    apiKey: 'paypal-api-key-123',
    apiSecret: 'paypal-secret-xxx',
    webhookUrl: 'https://yourdomain.com/paypal/webhook',
  },
  {
    id: 2,
    name: 'Stripe',
    enabled: false,
    apiKey: 'stripe-api-key-456',
    apiSecret: 'stripe-secret-yyy',
    webhookUrl: 'https://yourdomain.com/stripe/webhook',
  },
];

export default function PaymentGatewaysPage() {
  const [gateways, setGateways] = useState(initialGateways);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ apiKey: '', apiSecret: '', webhookUrl: '' });

  const startEdit = (gateway) => {
    setEditingId(gateway.id);
    setFormData({
      apiKey: gateway.apiKey,
      apiSecret: gateway.apiSecret,
      webhookUrl: gateway.webhookUrl,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ apiKey: '', apiSecret: '', webhookUrl: '' });
  };

  const saveEdit = () => {
    setGateways(prev =>
      prev.map(g =>
        g.id === editingId ? { ...g, ...formData } : g
      )
    );
    cancelEdit();
    alert('Настройки сохранены (эмуляция)');
  };

  const toggleEnabled = (id) => {
    setGateways(prev =>
      prev.map(g =>
        g.id === id ? { ...g, enabled: !g.enabled } : g
      )
    );
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1>Управление платежными шлюзами и API-интеграциями</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Название</th>
            <th style={thStyle}>Статус</th>
            <th style={thStyle}>Управление</th>
          </tr>
        </thead>
        <tbody>
          {gateways.map(gateway => (
            <tr key={gateway.id}>
              <td style={tdStyle}>{gateway.name}</td>
              <td style={tdStyle}>{gateway.enabled ? 'Включён' : 'Выключен'}</td>
              <td style={tdStyle}>
                <button onClick={() => toggleEnabled(gateway.id)} style={{ marginRight: 10 }}>
                  {gateway.enabled ? 'Выключить' : 'Включить'}
                </button>
                <button onClick={() => startEdit(gateway)}>
                  Редактировать
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Редактирование {gateways.find(g => g.id === editingId).name}</h2>

            <label style={{ display: 'block', marginTop: 10 }}>
              API Key:
              <input
                type="text"
                value={formData.apiKey}
                onChange={e => handleChange('apiKey', e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ display: 'block', marginTop: 10 }}>
              API Secret:
              <input
                type="text"
                value={formData.apiSecret}
                onChange={e => handleChange('apiSecret', e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ display: 'block', marginTop: 10 }}>
              Webhook URL:
              <input
                type="url"
                value={formData.webhookUrl}
                onChange={e => handleChange('webhookUrl', e.target.value)}
                style={inputStyle}
              />
            </label>

            <div style={{ marginTop: 20 }}>
              <button onClick={saveEdit} style={{ marginRight: 10 }}>Сохранить</button>
              <button onClick={cancelEdit}>Отмена</button>
            </div>
          </div>
        </div>
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

const inputStyle = {
  width: '100%',
  padding: 6,
  boxSizing: 'border-box',
};

const modalStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 8,
  width: '400px',
};
