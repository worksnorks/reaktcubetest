// src/pages/InventoryPage.jsx
import React, { useState } from 'react';
import Tabs from '../components/inventory/Tabs';
import ShardsTab from '../components/inventory/ShardsTab';
import GemsTab from '../components/inventory/GemsTab';
import TrophiesTab from '../components/inventory/TrophiesTab';
import AvatarsTab from '../components/inventory/AvatarsTab';
import HistoryTab from '../components/inventory/HistoryTab';
import GemModal from '../components/inventory/GemModal';

export default function InventoryPage() {
  const tabs = ['Осколки', 'Гемы', 'Трофеи', 'Аватарки', 'История'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedGem, setSelectedGem] = useState(null);

  // Заглушки, можно вынести в отдельные файлы/контексты
  const shards = [
    { id: 1, name: 'Осколок Кубика', count: 9, needed: 10 },
    { id: 2, name: 'Осколок Магии', count: 10, needed: 10 },
  ];

  const gems = [
    {
      id: 1,
      name: 'Редкий Гем',
      price: 150,
      image: 'https://via.placeholder.com/150?text=Gem+1',
      description: 'Редкий гем для обмена на уникальные предметы',
    },
    {
      id: 2,
      name: 'Легендарный Гем',
      price: 500,
      image: 'https://via.placeholder.com/150?text=Gem+2',
      description: 'Легендарный гем с мощными эффектами',
    },
  ];

  const trophies = [
    { id: 1, name: 'Трофей Победы', image: 'https://via.placeholder.com/100?text=Trophy+1' },
    { id: 2, name: 'Трофей Мастера', image: 'https://via.placeholder.com/100?text=Trophy+2' },
  ];

  const avatars = [
    { id: 1, name: 'Аватар 1', image: 'https://via.placeholder.com/100?text=Avatar+1' },
    { id: 2, name: 'Аватар 2', image: 'https://via.placeholder.com/100?text=Avatar+2' },
  ];

  const historyLogs = [
    { id: 1, text: 'Получено 5 осколков Кубика', date: '2025-07-28 14:00' },
    { id: 2, text: 'Продан Редкий Гем за 150 монет', date: '2025-07-29 10:00' },
    { id: 3, text: 'Выведен Легендарный Гем', date: '2025-07-29 12:30' },
  ];

  const handleExchangeShard = (shard) => {
    alert(`Обменять 10 осколков "${shard.name}" на гем`);
  };

  const handleSellGem = (gem) => {
    alert(`Продан гем: ${gem.name}`);
    setSelectedGem(null);
  };

  const handleWithdrawGem = (gem) => {
    alert(`Выведен гем: ${gem.name}`);
    setSelectedGem(null);
  };

  return (
    <div style={containerStyle}>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ marginTop: 20 }}>
        {activeTab === 'Осколки' && <ShardsTab shards={shards} onExchange={handleExchangeShard} />}
        {activeTab === 'Гемы' && <GemsTab gems={gems} onSelect={setSelectedGem} />}
        {activeTab === 'Трофеи' && <TrophiesTab trophies={trophies} />}
        {activeTab === 'Аватарки' && <AvatarsTab avatars={avatars} />}
        {activeTab === 'История' && <HistoryTab logs={historyLogs} />}
      </div>

      <GemModal
        gem={selectedGem}
        onClose={() => setSelectedGem(null)}
        onSell={handleSellGem}
        onWithdraw={handleWithdrawGem}
      />
    </div>
  );
}

const containerStyle = {
  maxWidth: 400,
  margin: '20px auto',
  fontFamily: 'Arial, sans-serif',
  color: '#222',
  paddingBottom: 80,
};
