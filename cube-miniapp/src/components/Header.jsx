// src/components/Header.jsx
import React, { useState } from 'react';

export default function Header({ nickname }) {
  const [showInfo, setShowInfo] = useState(false);

  const instructionText = `Здесь вы можете разместить любую инструкцию или полезную информацию.
Её можно легко изменить в коде компонента Header.`;

  return (
    <>
      <header
        style={{
          height: 49,
          padding: '0 20px',
          backgroundColor: '#0b2140',
          display: 'flex',
          alignItems: 'center',
          gap: 13,
          boxSizing: 'border-box',
          userSelect: 'none',
          boxShadow: 'inset 0 -4px 6px #132a55',
        }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/9919?s=128&v=4"
          alt="avatar"
          style={{
            width: 49,
            height: 49,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: 182, // уменьшено в 2 раза (было 364)
            padding: '10px 20px',
            fontWeight: '600',
            fontSize: 18,
            lineHeight: '29px',
            backgroundColor: '#0f2a5a',
            borderRadius: 49,
            boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.6)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            userSelect: 'text',
          }}
        >
          {nickname}
        </div>
        <button
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ffffff',
            color: '#0b2140',
            fontSize: 20,
            cursor: 'pointer',
            boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
          }}
          aria-label="Information"
          onClick={() => setShowInfo(true)}
        >
          i
        </button>
      </header>

      {showInfo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
          onClick={() => setShowInfo(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              maxWidth: 400,
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              userSelect: 'text',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Инструкция</h2>
            <p>{instructionText}</p>
            <button
              onClick={() => setShowInfo(false)}
              style={{
                marginTop: 15,
                padding: '8px 12px',
                backgroundColor: '#0b2140',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
