export function login(username, password) {
  return new Promise((resolve, reject) => {
    if (username === 'admin' && password === '1234') {
      resolve({ token: 'fake-jwt-token', username });
    } else {
      reject(new Error('Неверный логин или пароль'));
    }
  });
}
 
