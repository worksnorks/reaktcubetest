import React from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../api/auth';

export default function LoginPage({ onLoginSuccess }) {
  const handleLogin = (username, password) => {
    return login(username, password).then(user => {
      onLoginSuccess();
    });
  };

  return (
    <div>
      <h2>Вход в админку</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
