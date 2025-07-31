import React, { useState } from 'react';
import ReferralLink from '../components/referral/ReferralLink';
import ReferralStats from '../components/referral/ReferralStats';
import ReferralEarnings from '../components/referral/ReferralEarnings';
import ReferralFriendsList from '../components/referral/ReferralFriendsList';

export default function ReferralPage() {
  // Заглушки данных (заменить на реальные данные)
  const userId = 'user1234';
  const referralLink = `https://app.example.com/?ref=${userId}`;
  const invitedFriends = [
    { id: 1, name: 'Alice', registered: '2023-05-01', deposits: 100, active: true },
    { id: 2, name: 'Bob', registered: '2023-05-10', deposits: 50, active: false },
  ];
  const totalDeposits = invitedFriends.reduce((sum, f) => sum + f.deposits, 0);
  const referralBonusPercent = 0.01;
  const earnedBonus = totalDeposits * referralBonusPercent;

  // Баланс реферального заработка
  const [referralBalance, setReferralBalance] = useState(earnedBonus);

  const handleWithdraw = () => {
    alert('Вывод средств (заглушка)');
    setReferralBalance(0);
  };

  const handleAddToBalance = () => {
    alert('Зачисление на баланс (заглушка)');
    setReferralBalance(0);
  };

  return (
    <div style={{ maxWidth: 400, margin: '20px auto', fontFamily: 'Arial, sans-serif', paddingBottom: 80 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Реферальная программа</h1>

      <ReferralLink link={referralLink} />

      <ReferralStats
        totalFriends={invitedFriends.length}
        totalDeposits={totalDeposits}
        earnedBonus={earnedBonus}
      />

      <ReferralEarnings
        balance={referralBalance}
        threshold={10}
        onWithdraw={handleWithdraw}
        onAddToBalance={handleAddToBalance}
      />

      <ReferralFriendsList friends={invitedFriends} />
    </div>
  );
}
