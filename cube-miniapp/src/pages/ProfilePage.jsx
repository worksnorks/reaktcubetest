// src/pages/ProfilePage.jsx
import React from 'react';
import UserInfo from './profile/UserInfo'; // компонент с аватаром, ником и балансом
import FriendsList from './profile/FriendsList';
import Achievements from './profile/Achievements';
import ProfileCreationDate from './profile/ProfileCreationDate';
import Statistics from './profile/Statistics';

export default function ProfilePage() {
  // Заглушки для данных
  const userName = 'userxxxxxxxx';
  const coins = 150;
  const friends = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
  const achievements = ['🏆', '🎖️', '🎲', '🔥', '⭐'];
  const creationDate = '2023-02-15';
  const statistics = {
    totalRolls: 120,
    totalGames: 60,  // добавил поле totalGames
    wins: 45,
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        paddingBottom: 80,
        color: '#222',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Профиль</h1>

      {/* Верхняя панель: UserInfo и дата создания */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <UserInfo nickname={userName} coins={coins} avatarUrl="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
        <ProfileCreationDate date={creationDate} />
      </div>

      {/* Достижения */}
      <Achievements achievements={achievements} />

      {/* Друзья */}
      <FriendsList friends={friends} />

      {/* Статистика */}
      <Statistics stats={statistics} />
    </div>
  );
}
