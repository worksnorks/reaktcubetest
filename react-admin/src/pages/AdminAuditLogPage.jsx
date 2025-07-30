import React, { useState, useEffect } from 'react';

// Пример данных админов
const admins = [
  { tg_id: '123456', nickname: 'AdminOne' },
  { tg_id: '654321', nickname: 'ModeratorX' },
];

// Пример данных журнала действий (audit log)
const initialAuditLogs = [
  { id: 1, tg_id: '123456', action: 'Вошел в систему', timestamp: '2025-07-29 10:00:00' },
  { id: 2, tg_id: '123456', action: 'Изменил баланс пользователя id123', timestamp: '2025-07-29 10:15:00' },
  { id: 3, tg_id: '654321', action: 'Забанил пользователя id456', timestamp: '2025-07-29 11:00:00' },
  { id: 4, tg_id: '654321', action: 'Просмотрел статистику', timestamp: '2025-07-29 11:30:00' },
];

export default function AdminAuditLogPage() {
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [filterAdminId, setFilterAdminId] = useState('all');
  const [filteredLogs, setFilteredLogs] = useState(initialAuditLogs);

  useEffect(() => {
    if (filterAdminId === 'all') {
      setFilteredLogs(auditLogs);
    } else {
      setFilteredLogs(auditLogs.filter(log => log.tg_id === filterAdminId));
    }
  }, [filterAdminId, auditLogs]);

  return (
    <div>
      <h1>Журнал действий админов</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Фильтр по админу: </label>
        <select
          value={filterAdminId}
          onChange={(e) => setFilterAdminId(e.target.value)}
          style={{ padding: 6 }}
        >
          <option value="all">Все админы</option>
          {admins.map(admin => (
            <option key={admin.tg_id} value={admin.tg_id}>
              {admin.nickname} ({admin.tg_id})
            </option>
          ))}
        </select>
      </div>

      {filteredLogs.length === 0 ? (
        <p>Записи отсутствуют</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Время</th>
              <th style={thStyle}>Админ</th>
              <th style={thStyle}>Действие</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => {
              const admin = admins.find(a => a.tg_id === log.tg_id);
              return (
                <tr key={log.id}>
                  <td style={tdStyle}>{log.timestamp}</td>
                  <td style={tdStyle}>{admin ? `${admin.nickname} (${admin.tg_id})` : log.tg_id}</td>
                  <td style={tdStyle}>{log.action}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
