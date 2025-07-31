import React, { useState } from 'react';

// Пример данных админов
const initialAdmins = [
  { tg_id: '123456', nickname: 'AdminOne', role: 'Оператор', logs: ['Вошел в систему', 'Изменил баланс пользователя id123'] },
  { tg_id: '654321', nickname: 'ModeratorX', role: 'Модератор', logs: ['Забанил пользователя id456', 'Просмотрел статистику'] },
];

export default function AdminsPage() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [newRole, setNewRole] = useState('');

  const openManage = (admin) => {
    setSelectedAdmin(admin);
    setNewRole(admin.role);
    setShowManageModal(true);
  };

  const closeManage = () => {
    setShowManageModal(false);
    setSelectedAdmin(null);
  };

  const saveRole = () => {
    setAdmins(prev => prev.map(a => a.tg_id === selectedAdmin.tg_id ? {...a, role: newRole} : a));
    closeManage();
  };

  const openLogs = (admin) => {
    setSelectedAdmin(admin);
    setShowLogsModal(true);
  };

  const closeLogs = () => {
    setShowLogsModal(false);
    setSelectedAdmin(null);
  };

  return (
    <div>
      <h1>Администраторы</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>tg_id</th>
            <th style={thStyle}>Ник</th>
            <th style={thStyle}>Роль</th>
            <th style={thStyle}>Управление</th>
            <th style={thStyle}>Логи</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.tg_id}>
              <td style={tdStyle}>{admin.tg_id}</td>
              <td style={tdStyle}>{admin.nickname}</td>
              <td style={tdStyle}>{admin.role}</td>
              <td style={tdStyle}>
                <button onClick={() => openManage(admin)}>Управление</button>
              </td>
              <td style={tdStyle}>
                <button onClick={() => openLogs(admin)}>Логи</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модалка управления */}
      {showManageModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Управление админом: {selectedAdmin.nickname}</h2>
            <label>
              Роль:
              <select value={newRole} onChange={e => setNewRole(e.target.value)} style={{ marginLeft: 10 }}>
                <option>Оператор</option>
                <option>Модератор</option>
                <option>Старший админ</option>
                <option>Владелец</option>
              </select>
            </label>
            <div style={{ marginTop: 20 }}>
              <button onClick={saveRole} style={{ marginRight: 10 }}>Сохранить</button>
              <button onClick={closeManage}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка логов */}
      {showLogsModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Логи админа: {selectedAdmin.nickname}</h2>
            <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {selectedAdmin.logs.length === 0
                ? <li>Логи отсутствуют</li>
                : selectedAdmin.logs.map((log, i) => <li key={i} style={{ fontFamily: 'monospace' }}>{log}</li>)}
            </ul>
            <button onClick={closeLogs} style={{ marginTop: 10 }}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f0f0f0',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
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
  width: '350px',
};
