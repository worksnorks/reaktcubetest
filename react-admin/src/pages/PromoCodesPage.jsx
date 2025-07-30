import React, { useState } from 'react';

const tabs = [
  { key: 'all', label: 'Все промокоды' },
  { key: 'create', label: 'Создать промокод' },
  { key: 'search', label: 'Поиск промокода' },
];

// Пример данных для промокодов
const initialPromoCodes = [
  { id: 1, code: 'WELCOME10', active: true, reward: '10% скидка', user: 'all' },
  { id: 2, code: 'VIP50', active: false, reward: '50 монеток', user: '123456' },
];

// Функция для генерации случайного кода из 20 символов (буквы + цифры, заглавные)
function generateRandomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 20; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function PromoCodesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [promoCodes, setPromoCodes] = useState(initialPromoCodes);
  const [newCode, setNewCode] = useState('');
  const [newReward, setNewReward] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeCreateTab, setActiveCreateTab] = useState('all');
  const [singleCount, setSingleCount] = useState(1);
  const [singleReward, setSingleReward] = useState('');
  const [generatedCodes, setGeneratedCodes] = useState([]);

  const handleCreate = () => {
    if (!newCode.trim() || !newReward.trim()) {
      alert('Введите код и описание подарка');
      return;
    }
    if (promoCodes.some(pc => pc.code === newCode.trim())) {
      alert('Такой промокод уже есть');
      return;
    }
    const newPromo = {
      id: promoCodes.length + 1,
      code: newCode.trim(),
      active: true,
      reward: newReward.trim(),
      user: 'all',
    };
    setPromoCodes([...promoCodes, newPromo]);
    setNewCode('');
    setNewReward('');
    alert('Промокод создан');
  };

  const handleSearch = () => {
    const results = promoCodes.filter(pc =>
      pc.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleCreateSingles = () => {
    if (singleCount < 1) {
      alert('Количество должно быть минимум 1');
      return;
    }
    if (!singleReward.trim()) {
      alert('Введите, что даёт промокод');
      return;
    }
    const newCodes = [];
    for (let i = 0; i < singleCount; i++) {
      let code;
      do {
        code = generateRandomCode();
      } while (
        promoCodes.some(pc => pc.code === code) ||
        newCodes.some(nc => nc.code === code)
      );
      newCodes.push({
        id: promoCodes.length + 1 + i,
        code,
        reward: singleReward.trim(),
        user: 'single',
        active: true,
        expiry: null,
      });
    }
    setGeneratedCodes(newCodes);
    setPromoCodes([...promoCodes, ...newCodes]);
    alert(`Создано ${singleCount} одноразовых промокодов`);
  };

  return (
    <div>
      <h1>Промокоды</h1>
      <div style={{ marginBottom: 20 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              marginRight: 10,
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor: activeTab === tab.key ? '#3498db' : '#ccc',
              color: activeTab === tab.key ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'all' && (
        <>
          {promoCodes.length === 0 ? (
            <p>Промокоды отсутствуют</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Код</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Статус</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Что даёт</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Пользователь</th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.map(({ id, code, active, reward, user }) => (
                  <tr key={id}>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{code}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>
                      {active ? 'Активен' : 'Не активен'}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{reward}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>
                      {user === 'all' ? 'Все' : user === 'single' ? 'Одноразовый' : user}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {activeTab === 'create' && (
        <div style={{ maxWidth: 400 }}>
          <div style={{ marginBottom: 10 }}>
            <button
              onClick={() => setActiveCreateTab('all')}
              style={{
                marginRight: 10,
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: activeCreateTab === 'all' ? '#3498db' : '#ccc',
                color: activeCreateTab === 'all' ? 'white' : 'black',
                border: 'none',
                borderRadius: 4,
              }}
            >
              Для всех
            </button>
            <button
              onClick={() => setActiveCreateTab('single')}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: activeCreateTab === 'single' ? '#3498db' : '#ccc',
                color: activeCreateTab === 'single' ? 'white' : 'black',
                border: 'none',
                borderRadius: 4,
              }}
            >
              Одноразовый
            </button>
          </div>

          {activeCreateTab === 'all' && (
            <>
              <div style={{ marginBottom: 10 }}>
                <label>Код промокода:</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Что даёт:</label>
                <input
                  type="text"
                  value={newReward}
                  onChange={e => setNewReward(e.target.value)}
                  style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                />
              </div>
              <button onClick={handleCreate} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                Создать промокод
              </button>
            </>
          )}

          {activeCreateTab === 'single' && (
            <>
              <div style={{ marginBottom: 10 }}>
                <label>Количество одноразовых промокодов:</label>
                <input
                  type="number"
                  min={1}
                  value={singleCount}
                  onChange={e => setSingleCount(Number(e.target.value))}
                  style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Что даёт:</label>
                <input
                  type="text"
                  value={singleReward}
                  onChange={e => setSingleReward(e.target.value)}
                  style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                  placeholder="Например, 10 монеток"
                />
              </div>
              <button
                onClick={handleCreateSingles}
                style={{ padding: '8px 16px', cursor: 'pointer' }}
              >
                Создать одноразовые коды
              </button>

              {generatedCodes.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <h4>Сгенерированные промокоды:</h4>
                  <ul
                    style={{
                      maxHeight: 200,
                      overflowY: 'auto',
                      background: '#f0f0f0',
                      padding: 10,
                      borderRadius: 4,
                    }}
                  >
                    {generatedCodes.map((pc, i) => (
                      <li
                        key={i}
                        style={{ fontFamily: 'monospace', marginBottom: 4 }}
                      >
                        {pc.code}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'search' && (
        <div style={{ maxWidth: 600 }}>
          <input
            type="text"
            placeholder="Введите код для поиска"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: 8, boxSizing: 'border-box', marginBottom: 10 }}
          />
          <button onClick={handleSearch} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Найти
          </button>

          {searchResults.length > 0 ? (
            <table style={{ marginTop: 20, width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Код</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Статус</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Что даёт</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Пользователь</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(({ id, code, active, reward, user }) => (
                  <tr key={id}>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{code}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>
                      {active ? 'Активен' : 'Не активен'}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{reward}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>
                      {user === 'all' ? 'Все' : user === 'single' ? 'Одноразовый' : user}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ marginTop: 20 }}>Результаты не найдены</p>
          )}
        </div>
      )}
    </div>
  );
}
