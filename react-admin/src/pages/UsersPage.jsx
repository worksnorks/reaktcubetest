import React, { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // выбранный для управления

  // Загрузка списка пользователей при монтировании
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/users'); // адаптируй под свой API
      if (!res.ok) throw new Error('Ошибка загрузки пользователей');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setSelectedUser(null);
  };

  // Пример обработчика изменений пользователя (тут можно расширить)
  const handleSaveUser = () => {
    alert(`Сохранение пользователя ${selectedUser.cube_id} (заглушка)`);
    // Здесь можно сделать запрос к серверу для сохранения изменений
    closeModal();
  };

  return (
    <div>
      <h1>Пользователи</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#ddd' }}>
                <th style={thStyle}>cube_id</th>
                <th style={thStyle}>tg_id</th>
                <th style={thStyle}>balance_coins</th>
                <th style={thStyle}>balance_usdt</th>
                <th style={thStyle}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>
                    Пользователи не найдены
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.cube_id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={tdStyle}>{user.cube_id}</td>
                    <td style={tdStyle}>{user.tg_id}</td>
                    <td style={tdStyle}>{user.balance_coins}</td>
                    <td style={tdStyle}>{user.balance_usdt}</td>
                    <td style={tdStyle}>
                      <button onClick={() => setSelectedUser(user)} style={buttonStyleManage}>
                        Управление
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Модальное окно управления */}
          {selectedUser && (
            <div style={modalOverlayStyle} onClick={closeModal}>
              <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                <h2>Управление пользователем {selectedUser.cube_id}</h2>

                <p><b>Telegram ID:</b> {selectedUser.tg_id}</p>

                <label>
                  Баланс монеток:
                  <input
                    type="number"
                    value={selectedUser.balance_coins}
                    onChange={e => setSelectedUser({ ...selectedUser, balance_coins: Number(e.target.value) })}
                    style={{ marginLeft: 10 }}
                  />
                </label>

                <br /><br />

                <label>
                  Баланс USDT:
                  <input
                    type="number"
                    value={selectedUser.balance_usdt}
                    onChange={e => setSelectedUser({ ...selectedUser, balance_usdt: Number(e.target.value) })}
                    style={{ marginLeft: 10 }}
                  />
                </label>

                <br /><br />

                {/* Тут можно добавить чекбоксы или другие поля для банов, ролей и т.п. */}

                <button onClick={handleSaveUser} style={{ marginRight: 10 }}>
                  Сохранить
                </button>
                <button onClick={closeModal}>Отмена</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const thStyle = {
  padding: '10px',
  borderBottom: '2px solid #bbb',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
};

const buttonStyleManage = {
  backgroundColor: '#2980b9',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '6px',
  width: '400px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
};
