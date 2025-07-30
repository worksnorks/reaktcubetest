import React, { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [isCubeActive, setIsCubeActive] = useState(false);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchUserId, setSearchUserId] = useState('');

  // Загрузка статуса кубика и логов при монтировании
  useEffect(() => {
    fetchStatusAndLogs();
  }, []);

  // Обновляем отфильтрованные логи при изменении логов или поискового запроса
  useEffect(() => {
    if (!searchUserId.trim()) {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(
        logs.filter(log =>
          log.userId && log.userId.includes(searchUserId.trim())
        )
      );
    }
  }, [logs, searchUserId]);

  const fetchStatusAndLogs = async () => {
    try {
      setLoading(true);
      setError('');

      // Запрос статуса кубика (пример API)
      const statusRes = await fetch('/api/cube/status');
      if (!statusRes.ok) throw new Error('Ошибка загрузки статуса кубика');
      const statusData = await statusRes.json();

      // Запрос логов (пример API)
      const logsRes = await fetch('/api/cube/logs');
      if (!logsRes.ok) throw new Error('Ошибка загрузки логов');
      const logsData = await logsRes.json();

      setIsCubeActive(statusData.active);
      setLogs(logsData.logs);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Включить/выключить кубик
  const toggleCube = async () => {
    try {
      setLoading(true);
      setError('');
      const action = isCubeActive ? 'deactivate' : 'activate';
      const res = await fetch(`/api/cube/${action}`, { method: 'POST' });
      if (!res.ok) throw new Error('Ошибка при переключении кубика');
      const data = await res.json();
      setIsCubeActive(data.active);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Перезагрузить кубик
  const reloadCube = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/cube/reload', { method: 'POST' });
      if (!res.ok) throw new Error('Ошибка перезагрузки кубика');
      // После перезагрузки обновляем статус и логи
      await fetchStatusAndLogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Панель управления кубиком</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Загрузка...</p>}

      <p>Статус кубика: <strong>{isCubeActive ? 'Включён' : 'Выключен'}</strong></p>

      <button onClick={toggleCube} disabled={loading}>
        {isCubeActive ? 'Выключить кубик' : 'Включить кубик'}
      </button>

      <button onClick={reloadCube} disabled={loading} style={{ marginLeft: 10 }}>
        Перезагрузить кубик
      </button>

      <h2 style={{ marginTop: 30 }}>Логи ошибок</h2>

      <label htmlFor="searchUserId">Поиск по ID пользователя:</label><br />
      <input
        id="searchUserId"
        type="text"
        placeholder="Введите ID пользователя"
        value={searchUserId}
        onChange={e => setSearchUserId(e.target.value)}
        style={{ padding: '6px', margin: '10px 0 20px 0', width: '300px' }}
      />

      {filteredLogs.length === 0 ? (
        <p>Логи отсутствуют</p>
      ) : (
        <ul style={{ maxHeight: '300px', overflowY: 'auto', background: '#eee', padding: 10, borderRadius: 4 }}>
          {filteredLogs.map((log, idx) => (
            <li key={idx} style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: 6 }}>
              [{log.timestamp}] <b>{log.userId ? `User ${log.userId}:` : ''}</b> {log.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
