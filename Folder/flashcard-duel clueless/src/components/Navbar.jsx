// src/components/Navbar.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoGroup}>
          <span className={styles.boltIcon}>⚡</span>
          <h1 className={styles.brandLogo}>FLASHCARD DUEL</h1>
        </div>

        <div className={styles.metaContainer}>
          <div className={`${styles.statPill} ${styles.yellowPill}`}>
            <span>🔥</span>
            <span>{user?.streak || 0} DAY STREAK</span>
          </div>
          
          <div className={`${styles.statPill} ${styles.bluePill}`}>
            <span>⚡</span>
            <span>{user?.xp || 0} XP</span>
          </div>

          <div className={styles.profileBadge}>
            <span className={styles.avatarIcon}>👑</span>
            <span className={styles.username}>{user?.username || 'Guest'}</span>
          </div>

          <button onClick={logout} className={styles.exitBtn}>
            EXIT
          </button>
        </div>
      </nav>

      {/* The animated horizontal track line that sits right under your navbar container */}
      <div className="dino-border-track"></div>
    </>
  );
}