import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Это окно, которое появляется при клике на трофей
function TrophyModal({ trophy, onClose }) {
  // Если трофей не выбран — окно не показываем
  if (!trophy) return null;

  // Если нет описания или даты — показываем заглушки
  const description = trophy.description || 'Описание отсутствует.';
  const dateReceived = trophy.dateReceived
    ? new Date(trophy.dateReceived).toLocaleDateString()
    : 'Дата неизвестна';

  // ReactDOM.createPortal позволяет показать окно поверх всего остального
  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose} // если кликнули на фон — закрыть окно
    >
      <div
        style={{
          backgroundColor: 'white', borderRadius: 12, padding: 24,
          width: '90%', maxWidth: 400, boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()} // чтобы клик внутри окна не закрывал его
      >
        <button
          style={{
            position: 'absolute', top: 12, right: 12, fontSize: 24,
            background: 'none', border: 'none', cursor: 'pointer',
          }}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <img
          src={trophy.image}
          alt={trophy.name}
          style={{ width: '100%', borderRadius: 8 }}
        />
        <h2>{trophy.name}</h2>
        <p><strong>Описание:</strong> {description}</p>
        <p><strong>Получен:</strong> {dateReceived}</p>
      </div>
    </div>,
    document.body
  );
}

// Основной компонент со списком трофеев
export default function TrophiesTab({ trophies }) {
  // Здесь храним выбранный трофей (или null, если ничего не выбрано)
  const [selectedTrophy, setSelectedTrophy] = useState(null);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          marginTop: 20,
        }}
      >
        {trophies.map((trophy) => (
          <div
            key={trophy.id}
            style={{
              backgroundColor: '#f7f9fc',
              borderRadius: 12,
              padding: 16,
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedTrophy(trophy)} // при клике запоминаем этот трофей
            tabIndex={0} // чтобы можно было нажимать Enter для доступа с клавиатуры
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter') setSelectedTrophy(trophy); }}
          >
            <img
              src={trophy.image}
              alt={trophy.name}
              style={{ width: '100%', borderRadius: 8 }}
            />
            <div style={{ marginTop: 8, fontWeight: 'bold' }}>{trophy.name}</div>
          </div>
        ))}
      </div>

      {/* Модальное окно с информацией о выбранном трофее */}
      <TrophyModal
        trophy={selectedTrophy}
        onClose={() => setSelectedTrophy(null)} // при закрытии обнуляем выбранный трофей
      />
    </>
  );
}
