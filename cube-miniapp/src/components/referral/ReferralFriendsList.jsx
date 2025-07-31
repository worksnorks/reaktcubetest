import React from 'react';

export default function ReferralFriendsList({ friends }) {
  return (
    <div>
      <h3>Приглашённые друзья</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Имя</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Дата регистрации</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Пополнения (USDT)</th>
            <th style={{ textAlign: 'center', padding: '8px' }}>Активен</th>
          </tr>
        </thead>
        <tbody>
          {friends.map(({ id, name, registered, deposits, active }) => (
            <tr key={id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {name}
              </td>
              <td style={{ padding: '8px' }}>{registered}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{deposits.toFixed(2)}</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>
                {active ? '✅' : '❌'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
