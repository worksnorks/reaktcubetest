import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Пример данных пользователей (заменить на реальные с сервера)
const initialUserStats = [
  { time: '10:00', activeUsers: 20 },
  { time: '10:10', activeUsers: 25 },
  { time: '10:20', activeUsers: 22 },
  { time: '10:30', activeUsers: 30 },
  { time: '10:40', activeUsers: 28 },
];

// Пример данных сервера (заменить на реальные с сервера)
const initialServerStats = {
  cpu: 25,     // в %
  memory: 40,  // в %
  uptime: 3600 // в секундах
};

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}ч ${m}м ${s}с`;
}

export default function MonitoringStatsPage() {
  const [userStats, setUserStats] = useState(initialUserStats);
  const [serverStats, setServerStats] = useState(initialServerStats);

  // Имитация обновления данных (каждые 10 секунд)
  useEffect(() => {
    const interval = setInterval(() => {
      // Здесь надо получать данные с API сервера, пример:
      // fetch('/api/stats').then(...)

      // Для примера - добавим случайные данные
      setUserStats(prev => {
        const newTime = new Date();
        const formattedTime = `${newTime.getHours()}:${String(newTime.getMinutes()).padStart(2,'0')}`;
        const newActiveUsers = Math.max(0, Math.min(100, prev[prev.length-1].activeUsers + (Math.random() * 10 - 5)));
        const newData = [...prev.slice(-9), { time: formattedTime, activeUsers: Math.round(newActiveUsers) }];
        return newData;
      });

      setServerStats(prev => ({
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() * 6 - 3))),
        memory: Math.min(100, Math.max(0, prev.memory + (Math.random() * 6 - 3))),
        uptime: prev.uptime + 10,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Мониторинг и статистика</h1>

      <section style={{ marginBottom: 40 }}>
        <h2>Активность пользователей</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userStats}>
            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h2>Статус сервера</h2>
        <p><b>CPU:</b> {serverStats.cpu.toFixed(1)}%</p>
        <p><b>Память:</b> {serverStats.memory.toFixed(1)}%</p>
        <p><b>Время работы:</b> {formatUptime(serverStats.uptime)}</p>
      </section>
    </div>
  );
}
