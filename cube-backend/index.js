const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// --- Временное хранилище данных ---
let cubeStatus = { active: false };
let users = [];
let logs = [];

// --- API ---
// Проверка статуса кубика
app.get('/api/cube/status', (req, res) => {
  res.json(cubeStatus);
});

// Включить кубик
app.post('/api/cube/activate', (req, res) => {
  cubeStatus.active = true;
  logs.push({ timestamp: Date.now(), message: 'Кубик включен' });
  res.json(cubeStatus);
});

// Выключить кубик
app.post('/api/cube/deactivate', (req, res) => {
  cubeStatus.active = false;
  logs.push({ timestamp: Date.now(), message: 'Кубик выключен' });
  res.json(cubeStatus);
});

// Перезагрузить кубик
app.post('/api/cube/reload', (req, res) => {
  logs.push({ timestamp: Date.now(), message: 'Кубик перезагружен' });
  // Логика перезагрузки здесь (пока эмуляция)
  res.json({ message: 'Кубик перезагружен' });
});

// Получить логи кубика
app.get('/api/cube/logs', (req, res) => {
  res.json({ logs });
});

// Регистрация пользователя (обрабатывается POST /user)
app.post('/user', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const user = { 
    id: users.length + 1, 
    username, 
    balance_coins: 0, 
    balance_usdt: 0, 
    rolls: 3 // начальное количество бросков, например
  };
  users.push(user);
  logs.push({ timestamp: Date.now(), message: `Пользователь зарегистрирован: ${username}` });
  res.json(user);
});

// Получить данные пользователя по id (GET /user/:id)
app.get('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Выполнить бросок кубика (POST /roll)
app.post('/roll', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'User ID required' });

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!cubeStatus.active) return res.status(400).json({ error: 'Кубик выключен' });
  if (user.rolls <= 0) return res.status(400).json({ error: 'Нет доступных бросков' });

  const rollResult = Math.floor(Math.random() * 6) + 1;
  user.rolls -= 1;
  user.balance_coins += rollResult; // например, монетки добавляем по числу на кубике

  logs.push({ timestamp: Date.now(), message: `Пользователь ${user.username} бросил кубик: ${rollResult}` });

  res.json({
    roll: rollResult,
    rollsLeft: user.rolls,
    balance: user.balance_coins,
  });
});

// Получить список пользователей (GET /api/users)
app.get('/api/users', (req, res) => {
  res.json({ users });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
