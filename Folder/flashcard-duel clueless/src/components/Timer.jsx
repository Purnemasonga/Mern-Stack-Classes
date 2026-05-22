import { useState, useEffect } from 'react';
import styles from './Timer.module.css';

export default function Timer({ seconds = 15, onExpire, running = true }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, running, onExpire]);

  const pct = (timeLeft / seconds) * 100;
  const urgent = timeLeft <= 5;

  return (
    <div className={styles.wrapper}>
      <span className={`${styles.digit} ${urgent ? styles.urgent : ''}`}>
        {timeLeft}
      </span>
      <div className={styles.track}>
        <div
          className={`${styles.bar} ${urgent ? styles.barUrgent : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}