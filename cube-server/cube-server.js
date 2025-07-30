const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
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
  // Отдаем статические файлы из public
  if (req.method === 'GET' && (req.url.startsWith('/dice_animations/') || req.url === '/' || req.url.endsWith('.css'))) {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Файл не найден');
        return;
      }
      // Определяем тип содержимого
      let ext = path.extname(filePath).toLowerCase();
      let contentType = 'text/plain';
      if (ext === '.html') contentType = 'text/html; charset=utf-8';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.webm') contentType = 'video/webm';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
    return;
  }

  if (req.url === '/user' && req.method === 'POST') {
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
  } else if (req.url.startsWith('/user/') && req.method === 'GET') {
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
  } else if (req.url === '/roll' && req.method === 'POST') {
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
  } else {
    res.writeHead(404);
    res.end('Не найдено');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
