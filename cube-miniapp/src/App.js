// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import DicePage from './components/DicePage';
import MenuPage from './components/MenuPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/shop/ShopPage';
import ReferralPage from './pages/ReferralPage';
import PlaceholderPage from './pages/PlaceholderPage';
import BottomNav from './components/BottomNav';
import InventoryPage from './pages/InventoryPage';
import InfoPage from './pages/InfoPage';


const idleSrc = '/dice_animations/1-Idle_VP9.webm';

function App() {
  const [nickname, setNickname] = useState('userxxxxxxxx');
  const [coins, setCoins] = useState(100);
  const [rolls, setRolls] = useState(3);
  const maxRolls = 10;
  const [timerProgress, setTimerProgress] = useState(0);
  const [result, setResult] = useState('-');
  const [isRolling, setIsRolling] = useState(false);

  const videoRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Подсветка текущей вкладки BottomNav в зависимости от URL
  const currentPath = location.pathname;
  let currentTab = 'dice';

  if (currentPath.startsWith('/profile')) currentTab = 'profile';
  else if (
    [
      '/menu',
      '/shop',
      '/market',
      '/containers',
      '/games',
      '/referral',
      '/inventory',
      '/info',
      '/support',
      '/withdraw',
    ].some((p) => currentPath.startsWith(p))
  )
    currentTab = 'menu';
  else if (currentPath.startsWith('/settings')) currentTab = 'settings';
  else if (currentPath.startsWith('/dice') || currentPath === '/') currentTab = 'dice';

  // При смене вкладки меняем URL
  const handleTabChange = (tab) => {
    switch (tab) {
      case 'dice':
        navigate('/dice');
        break;
      case 'menu':
        navigate('/menu'); // стартовая страница меню
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        navigate('/dice');
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = idleSrc;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) % 3600000;
      const progress = (elapsed / 3600000) * 100;
      setTimerProgress(progress);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTimeout(() => {
      const rollResult = Math.floor(Math.random() * 6) + 1;
      setResult(rollResult);
      setRolls((r) => (r > 0 ? r - 1 : 0));
      setCoins((c) => c + rollResult);
      setIsRolling(false);
    }, 4000);
  };

  const handleLogout = () => {
    setNickname('');
    setResult('-');
    setRolls(0);
    setCoins(0);
    navigate('/dice');
    if (videoRef.current) {
      videoRef.current.src = idleSrc;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/dice"
          element={
            <DicePage
              nickname={nickname}
              coins={coins}
              rolls={rolls}
              maxRolls={maxRolls}
              timerProgress={timerProgress}
              videoRef={videoRef}
              isRolling={isRolling}
              onRoll={handleRoll}
              onLogout={handleLogout}
              result={result}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Меню стартует с /menu */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/market" element={<PlaceholderPage label="Торговая площадка" />} />
        <Route path="/containers" element={<PlaceholderPage label="Контейнеры" />} />
        <Route path="/games" element={<PlaceholderPage label="Игры" />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/info" element={<PlaceholderPage label="Информация" />} />
        <Route path="/support" element={<PlaceholderPage label="Поддержка" />} />
        <Route path="/withdraw" element={<PlaceholderPage label="Выводы" />} />
        <Route path="/info" element={<InfoPage />} />


        <Route path="/" element={<Navigate to="/dice" replace />} />
        <Route path="*" element={<Navigate to="/dice" replace />} />
      </Routes>

      <BottomNav currentTab={currentTab} setCurrentTab={handleTabChange} />
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
