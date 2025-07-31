import React, { useState } from 'react';

const toggleStyle = {
  position: 'relative',
  width: 50,
  height: 28,
  borderRadius: 14,
  backgroundColor: '#ccc',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const toggleCircleStyle = {
  position: 'absolute',
  top: 2,
  left: 2,
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: 'white',
  transition: 'left 0.3s',
  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
};

function Toggle({ isOn, onToggle }) {
  return (
    <div
      style={{
        ...toggleStyle,
        backgroundColor: isOn ? '#4cd964' : '#ccc',
      }}
      onClick={() => onToggle(!isOn)}
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(!isOn);
        }
      }}
    >
      <div
        style={{
          ...toggleCircleStyle,
          left: isOn ? 24 : 2,
        }}
      />
    </div>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState({
    setting1: false,
    setting2: true,
    setting3: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        paddingBottom: 80,
      }}
    >
      <h2>Настройки</h2>
      <div style={{ marginTop: 20 }}>
        {Object.entries(settings).map(([key, value], index) => (
          <div
            key={key}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #eee',
              fontSize: 16,
            }}
          >
            <span>{`Настройка ${index + 1}`}</span>
            <Toggle isOn={value} onToggle={() => toggleSetting(key)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsPage;
