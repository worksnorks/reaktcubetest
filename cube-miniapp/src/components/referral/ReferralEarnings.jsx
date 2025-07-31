import React from 'react';

export default function ReferralEarnings({ balance, threshold, onWithdraw, onAddToBalance }) {
  const canWithdraw = balance >= threshold;

  return (
    <div style={{
      backgroundColor: '#dceaff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div>Текущий баланс реферальных бонусов: {balance.toFixed(2)} USDT</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          disabled={!canWithdraw}
          onClick={onAddToBalance}
          style={{
            padding: '8px 12px',
            cursor: canWithdraw ? 'pointer' : 'not-allowed',
            backgroundColor: canWithdraw ? '#4a90e2' : '#aaa',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
          }}
        >
          Зачислить на баланс
        </button>
        <button
          disabled={!canWithdraw}
          onClick={onWithdraw}
          style={{
            padding: '8px 12px',
            cursor: canWithdraw ? 'pointer' : 'not-allowed',
            backgroundColor: canWithdraw ? '#e94e4e' : '#aaa',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
          }}
        >
          Вывести
        </button>
      </div>
    </div>
  );
}
