import React from 'react';

export default function ReferralStats({ totalFriends, totalDeposits, earnedBonus }) {
  return (
    <div style={{
      backgroundColor: '#e6f0ff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      fontWeight: '600',
    }}>
      <div>Приглашено друзей: {totalFriends}</div>
      <div>Общий объём пополнений (USDT): {totalDeposits.toFixed(2)}</div>
      <div>Заработано бонусов (1%): {earnedBonus.toFixed(2)} USDT</div>
    </div>
  );
}
