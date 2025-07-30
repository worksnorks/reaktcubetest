const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Отдаем index.html из папки public
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Ошибка сервера');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      }
    });
  } 
  else if (req.url === '/user' && req.method === 'POST') {
    // Создать нового пользователя по нику
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { nickname } = JSON.parse(body);
      if (!nickname) {
        res.writeHead(400);
        return res.end('Никнейм обязателен');
      }
      let users = readUsers();

      if (users.find(u => u.nickname === nickname)) {
        res.writeHead(400);
        return res.end('Никнейм уже занят');
      }

      const newIdNumber = users.length + 1;
      const newId = String(newIdNumber).padStart(9, '0');

      users.push({ id: newId, nickname, rolls: 10, balance: 0 });
      writeUsers(users);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ id: newId }));
    });
  }
  else if (req.url.startsWith('/user/') && req.method === 'GET') {
    // Получить данные пользователя по ID
    const id = req.url.split('/')[2];
    let users = readUsers();
    const user = users.find(u => u.id === id);
    if (!user) {
      res.writeHead(404);
      res.end('Пользователь не найден');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  }
  else if (req.url === '/roll' && req.method === 'POST') {
    // Сделать бросок кубика
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { id } = JSON.parse(body);
      let users = readUsers();
      const user = users.find(u => u.id === id);
      if (!user) {
        res.writeHead(404);
        return res.end('Пользователь не найден');
      }
      if (user.rolls <= 0) {
        res.writeHead(400);
        return res.end('Нет доступных бросков');
      }
      const roll = Math.floor(Math.random() * 6) + 1;
      user.rolls--;
      user.balance += roll;
      writeUsers(users);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ roll, rollsLeft: user.rolls, balance: user.balance }));
    });
  }
  else if (req.url === '/users' && req.method === 'GET') {
    // Новый маршрут для админки: вернуть всех пользователей
    const users = readUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
  else {
    res.writeHead(404);
    res.end('Не найдено');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
