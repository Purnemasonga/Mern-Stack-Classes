// src/components/ProgressBar.jsx
import React from 'react';
import styles from './ProgressBar.module.css';

export default function ProgressBar({ userScore, opponentScore, totalQuestions }) {
  // Convert current real-time counts into matching percentage layouts
  const userPercent = Math.min((userScore / totalQuestions) * 100, 100);
  const oppPercent = Math.min((opponentScore / totalQuestions) * 100, 100);

  return (
    <div className={styles.trackerContainer}>
      {/* Tracker Lane 1: Current Player */}
      <div className={styles.trackLane}>
        <div className={styles.laneMeta}>
          <span className={styles.playerLabel}>YOU (admin)</span>
          <span className={styles.scoreBadge}>{userScore} PTS</span>
        </div>
        <div className={styles.trackRail}>
          <div 
            className={`${styles.fillBar} ${styles.userFill}`} 
            style={{ width: `${userPercent}%` }}
          />
        </div>
      </div>

      {/* Tracker Lane 2: Live Opponent Sync */}
      <div className={styles.trackLane}>
        <div className={styles.laneMeta}>
          <span className={styles.playerLabel}>OPPONENT</span>
          <span className={styles.scoreBadge}>{opponentScore} PTS</span>
        </div>
        <div className={styles.trackRail}>
          <div 
            className={`${styles.fillBar} ${styles.oppFill}`} 
            style={{ width: `${oppPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}