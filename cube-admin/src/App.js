import React, { useState, useEffect } from 'react';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = '12345';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const handleLogin = () => {
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError('');
      fetchUsers();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const fetchUsers = () => {
    fetch('http://localhost:3001/users') // <- здесь нужно будет сделать такой endpoint на сервере!
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
        <h2>Вход в админку</h2>
        <input
          placeholder="Логин"
          value={login}
          onChange={e => setLogin(e.target.value)}
          style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
        />
        <button onClick={handleLogin} style={{ padding: '8px 16px' }}>Войти</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Панель администратора</h2>
      <button onClick={() => setLoggedIn(false)}>Выйти</button>
      <h3>Пользователи</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{border: '1px solid #ccc', padding: 8}}>ID</th>
            <th style={{border: '1px solid #ccc', padding: 8}}>Никнейм</th>
            <th style={{border: '1px solid #ccc', padding: 8}}>Броски</th>
            <th style={{border: '1px solid #ccc', padding: 8}}>Баланс</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center', padding: 8 }}>Пользователи не найдены</td></tr>
          )}
          {users.map(u => (
            <tr key={u.id}>
              <td style={{border: '1px solid #ccc', padding: 8}}>{u.id}</td>
              <td style={{border: '1px solid #ccc', padding: 8}}>{u.nickname}</td>
              <td style={{border: '1px solid #ccc', padding: 8}}>{u.rolls}</td>
              <td style={{border: '1px solid #ccc', padding: 8}}>{u.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
