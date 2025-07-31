// src/pages/DicePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import BalanceRolls from '../components/BalanceRolls';

const idleSrc = '/dice_animations/1-Idle_VP9.webm';
const toSpinSrc = '/dice_animations/2-ToSpin_VP9.webm';
const spinSrc = '/dice_animations/3-Spin_1_VP9.webm';

const rollSrcs = {
  1: '/dice_animations/4-Roll_1_VP9.webm',
  2: '/dice_animations/4-Roll_2_VP9.webm',
  3: '/dice_animations/4-Roll_3_VP9.webm',
  4: '/dice_animations/4-Roll_4_VP9.webm',
  5: '/dice_animations/4-Roll_5_VP9.webm',
  6: '/dice_animations/4-Roll_6_VP9.webm',
};

const toIdleSrcs = {
  1: '/dice_animations/5-ToIdle_1_VP9.webm',
  2: '/dice_animations/5-ToIdle_2_VP9.webm',
  3: '/dice_animations/5-ToIdle_3_VP9.webm',
  4: '/dice_animations/5-ToIdle_4_VP9.webm',
  5: '/dice_animations/5-ToIdle_5_VP9.webm',
  6: '/dice_animations/5-ToIdle_6_VP9.webm',
};

function DicePage({ nickname, coins, rolls, maxRolls }) {
  const videoRef = useRef(null);
  const timerWidth = 300;
  const timerHeight = 20;

  const [videoSrc, setVideoSrc] = useState(idleSrc);
  const [isRolling, setIsRolling] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [rollButtonTimer, setRollButtonTimer] = useState(0);

  useEffect(() => {
    setVideoSrc(idleSrc);
  }, []);

  const playRollAnimation = (roll) => {
    if (!videoRef.current) return;
    setIsRolling(true);
    setCurrentRoll(roll);

    const animationSequence = [
      { src: toSpinSrc, loop: false, duration: 2000 },
      { src: spinSrc, loop: true, duration: 1000 },
      { src: rollSrcs[roll], loop: false, duration: 4000 },
      { src: toIdleSrcs[roll], loop: false, duration: 2000 },
    ];

    let currentStep = 0;

    const playNext = () => {
      if (currentStep >= animationSequence.length) {
        setVideoSrc(idleSrc);
        setIsRolling(false);
        setCurrentRoll(null);
        return;
      }

      const anim = animationSequence[currentStep];
      setVideoSrc(anim.src);

      setTimeout(() => {
        currentStep++;
        playNext();
      }, anim.duration);
    };

    playNext();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      videoRef.current.loop = videoSrc === spinSrc || videoSrc === idleSrc;
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  // Таймер прогресса (10 секунд)
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) % 10000; // 10 секунд
      const progress = (elapsed / 10000) * 100;
      setTimerProgress(progress);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Обратный отсчет кнопки броска кубика
  useEffect(() => {
    let timerInterval;
    if (rollButtonTimer > 0) {
      timerInterval = setInterval(() => {
        setRollButtonTimer((t) => {
          if (t <= 1) {
            clearInterval(timerInterval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [rollButtonTimer]);

  function interpolateColor(color1, color2, factor) {
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  }

  function rgbToHex(rgb) {
    return (
      '#' +
      rgb
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  const colors = [
    [255, 123, 123], // мягкий красный
    [255, 176, 123], // мягкий оранжевый
    [255, 224, 123], // мягкий жёлтый
    [171, 210, 226], // мягкий голубой
    [94, 154, 246], // мягкий синий
  ];

  const getSmoothProgressColor = (progress) => {
    const p = progress / 100;
    if (p <= 0) return rgbToHex(colors[0]);
    if (p >= 1) return rgbToHex(colors[4]);

    const scaled = p * (colors.length - 1);
    const idx = Math.floor(scaled);
    const factor = scaled - idx;

    const color = interpolateColor(colors[idx], colors[idx + 1], factor);
    return rgbToHex(color);
  };

  // Обработка нажатия на кнопку броска
  const handleRollClick = () => {
    if (isRolling || rollButtonTimer > 0) return;
    const randomRoll = Math.floor(Math.random() * 6) + 1;
    playRollAnimation(randomRoll);
    setRollButtonTimer(10);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh',
        justifyContent: 'space-between',
        paddingBottom: 80,
        backgroundColor: '#f5f9ff',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Header nickname={nickname} />

      <div
        style={{
          position: 'relative',
          width: 280,
          height: 280,
          marginBottom: 20,
        }}
      >
        <video
          ref={videoRef}
          width={280}
          height={280}
          style={{
            borderRadius: 12,
          }}
          muted
          loop={false}
          playsInline
        />
      </div>

      {/* Прогресс-бар таймера */}
      <div
        style={{
          width: timerWidth,
          height: timerHeight,
          backgroundColor: '#ddd',
          borderRadius: timerHeight / 2,
          overflow: 'hidden',
          marginBottom: 20,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            width: `${timerProgress}%`,
            height: '100%',
            backgroundColor: getSmoothProgressColor(timerProgress),
            transition: 'width 0.05s linear, background-color 0.3s ease',
            boxShadow: '0 0 8px rgba(0,0,0,0.15)',
          }}
        />
      </div>

      <BalanceRolls coins={coins} rolls={rolls} maxRolls={maxRolls} />

      <button
        onClick={handleRollClick}
        style={{
          marginTop: 20,
          padding: '15px 30px',
          fontSize: 20,
          fontWeight: '600',
          color: 'white',
          backgroundColor: rollButtonTimer > 0 ? '#004a99' : '#007bff',
          border: 'none',
          borderRadius: 8,
          cursor: rollButtonTimer > 0 ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 10px rgba(0,123,255,0.4)',
          transition: 'background-color 0.3s ease',
          userSelect: 'none',
        }}
        disabled={rollButtonTimer > 0}
      >
        {rollButtonTimer > 0 ? `Подождите (${rollButtonTimer}s)` : 'Тест броска (Play Roll Animation)'}
      </button>
    </div>
  );
}

export default DicePage;
