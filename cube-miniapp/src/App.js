import React, { useState, useEffect, useRef } from 'react';

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

function App() {
  const [nickname, setNickname] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [registerMsg, setRegisterMsg] = useState('');
  const [result, setResult] = useState('-');
  const [rollsLeft, setRollsLeft] = useState('-');
  const [balance, setBalance] = useState('-');
  const [isRolling, setIsRolling] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      setCurrentUserId(savedUserId);
      fetchUserData(savedUserId);
    } else {
      playIdle();
    }
  }, []);

  const playIdle = () => {
    if (!videoRef.current) return;
    videoRef.current.src = idleSrc;
    videoRef.current.loop = true;
    videoRef.current.play().catch(() => {});
  };

  const playRollAnimation = (roll) => {
    const video = videoRef.current;
    if (!video) return;

    setIsRolling(true);

    const animationSequence = [
      { src: toSpinSrc, loop: false, duration: 2000 },
      { src: spinSrc, loop: true, duration: 1000 },
      { src: rollSrcs[roll], loop: false, duration: 4000 },
      { src: toIdleSrcs[roll], loop: false, duration: 2000 }
    ];

    let currentStep = 0;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    const playNext = () => {
      if (currentStep >= animationSequence.length) {
        playIdle();
        setIsRolling(false);
        return;
      }

      const anim = animationSequence[currentStep];
      video.loop = anim.loop;
      video.src = anim.src;

      video.onloadeddata = () => {
        playVideo();
      };

      if (anim.duration) {
        setTimeout(() => {
          currentStep++;
          playNext();
        }, anim.duration);
      } else {
        video.onended = () => {
          video.onended = null;
          currentStep++;
          playNext();
        };
      }
    };

    playNext();
  };

  const handleRegister = () => {
    if (!nickname.trim()) {
      setRegisterMsg('Введите никнейм');
      return;
    }

    fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: nickname.trim() }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          return res.text().then(text => { throw new Error(text); });
        }
      })
      .then((data) => {
        setRegisterMsg(`Пользователь создан. Ваш ID: ${data.id}`);
        setCurrentUserId(data.id);
        localStorage.setItem('currentUserId', data.id);
        fetchUserData(data.id);
      })
      .catch((err) => {
        setRegisterMsg(`Ошибка: ${err.message}`);
      });
  };

  const fetchUserData = (id) => {
    fetch(`/user/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Пользователь не найден');
        return res.json();
      })
      .then(user => {
        setRollsLeft(user.rolls || 0);
        setBalance(user.balance_coins || 0);
      })
      .catch(() => {
        setRollsLeft('-');
        setBalance('-');
      });
  };

  const handleRoll = () => {
    if (!currentUserId || isRolling) return;

    setIsRolling(true);

    fetch('/roll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: currentUserId }),
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
      })
      .then(data => {
        playRollAnimation(data.roll);
        setTimeout(() => {
          setResult(data.roll);
          setRollsLeft(data.rollsLeft);
          setBalance(data.balance);
          setIsRolling(false);
        }, 7000);
      })
      .catch(err => {
        setResult(`Ошибка: ${err.message}`);
        setIsRolling(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUserId');
    setCurrentUserId(null);
    setResult('-');
    setRollsLeft('-');
    setBalance('-');
    setRegisterMsg('');
    setNickname('');
    playIdle();
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: '20px auto', padding: 10, fontFamily: 'Arial, sans-serif' }}>
      <h1>Мини-апп Кубик</h1>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <video
          ref={videoRef}
          width="200"
          height="200"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {!currentUserId ? (
        <div className="card" style={{ border: '1px solid #ddd', padding: 15, marginBottom: 20, borderRadius: 8 }}>
          <h2>Регистрация</h2>
          <input
            type="text"
            placeholder="Введите никнейм"
            className="input"
            style={{ padding: 6, width: 200, marginRight: 8 }}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="btn" style={{ padding: '8px 12px', margin: '5px 0', cursor: 'pointer' }} onClick={handleRegister}>
            Зарегистрироваться
          </button>
          <p className="message">{registerMsg}</p>
        </div>
      ) : (
        <div className="card" style={{ border: '1px solid #ddd', padding: 15, marginBottom: 20, borderRadius: 8 }}>
          <p>Ваш ID: {currentUserId}</p>
          <button className="btn" onClick={handleRoll} disabled={isRolling} style={{ padding: '8px 12px', margin: '5px 0', cursor: isRolling ? 'not-allowed' : 'pointer' }}>
            Бросить кубик
          </button>
          <p>Результат: {result}</p>
          <p>Осталось бросков: {rollsLeft}</p>
          <p>Баланс монеток: {balance}</p>
          <button className="btn" onClick={handleLogout} style={{ marginTop: 10 }}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
