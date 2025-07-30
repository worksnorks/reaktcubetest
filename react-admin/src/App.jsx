import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import ShopPage from './pages/ShopPage';
import ItemsPage from './pages/ItemsPage';
import PromoCodesPage from './pages/PromoCodesPage';
import StatsPage from './pages/StatsPage';
import PartnersPage from './pages/PartnersPage';
import AdminAuditLogPage from './pages/AdminAuditLogPage';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: theme === 'light' ? '#f0f0f0' : '#1e1e1e',
      color: theme === 'light' ? '#222' : '#ddd',
    },
    sidebar: {
      width: '220px',
      padding: '20px',
      boxSizing: 'border-box',
      background: theme === 'light' ? '#fff' : '#2c3e50',
      color: theme === 'light' ? '#333' : '#ecf0f1',
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    navItem: {
      marginBottom: '15px',
    },
    link: {
      color: theme === 'light' ? '#555' : '#bdc3c7',
      textDecoration: 'none',
      fontSize: '18px',
      display: 'block',
      padding: '8px 12px',
      borderRadius: '4px',
    },
    activeLink: {
      backgroundColor: theme === 'light' ? '#2980b9' : '#3498db',
      color: 'white',
      fontWeight: 'bold',
    },
    main: {
      flexGrow: 1,
      padding: '30px',
    },
    toggleBtn: {
      marginTop: '30px',
      padding: '8px 12px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: theme === 'light' ? '#2980b9' : '#3498db',
      color: '#fff',
      width: '100%',
    }
  };

  const links = [
    { path: '/dashboard', label: 'Панель' },
    { path: '/users', label: 'Пользователи' },
    { path: '/shop', label: 'Магазин' },
    { path: '/items', label: 'Предметы' },
    { path: '/promocodes', label: 'Промокоды' },
    { path: '/stats', label: 'Статистика' },
    { path: '/partners', label: 'Партнеры' },
    { path: '/admin-audit-log', label: 'Журнал админов' },
  ];

  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.sidebar}>
          <ul style={styles.navList}>
            {links.map(({ path, label }) => (
              <li key={path} style={styles.navItem}>
                <NavLink
                  to={path}
                  style={({ isActive }) =>
                    isActive
                      ? { ...styles.link, ...styles.activeLink }
                      : styles.link
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button style={styles.toggleBtn} onClick={toggleTheme}>
            Переключить {theme === 'light' ? 'тёмную' : 'светлую'} тему
          </button>
        </nav>
        <main style={styles.main}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/promocodes" element={<PromoCodesPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/admin-audit-log" element={<AdminAuditLogPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
