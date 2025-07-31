import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function AvatarModal({ avatar, onClose }) {
  if (!avatar) return null;

  const description = avatar.description || 'Описание отсутствует.';
  const dateReceived = avatar.dateReceived
    ? new Date(avatar.dateReceived).toLocaleDateString()
    : 'Дата неизвестна';

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Закрыть модалку">×</button>
        <img src={avatar.image} alt={avatar.name} style={{ width: '100%', borderRadius: 8 }} />
        <h2>{avatar.name}</h2>
        <p><strong>Описание:</strong> {description}</p>
        <p><strong>Получен:</strong> {dateReceived}</p>
      </div>
    </div>,
    document.body
  );
}

export default function AvatarsTab({ avatars }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <>
      <div style={gridStyle}>
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            style={cardStyle}
            onClick={() => setSelectedAvatar(avatar)}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter') setSelectedAvatar(avatar); }}
          >
            <img src={avatar.image} alt={avatar.name} style={{ width: '100%', borderRadius: 8 }} />
            <div style={{ marginTop: 8, fontWeight: 'bold' }}>{avatar.name}</div>
          </div>
        ))}
      </div>

      <AvatarModal avatar={selectedAvatar} onClose={() => setSelectedAvatar(null)} />
    </>
  );
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 20,
  marginTop: 20,
};

const cardStyle = {
  backgroundColor: '#f7f9fc',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  textAlign: 'center',
  userSelect: 'none',
  cursor: 'pointer',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 24,
  width: '90%',
  maxWidth: 400,
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: 12,
  right: 12,
  fontSize: 24,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};
