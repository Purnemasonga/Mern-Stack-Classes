// src/pages/ResultsPage.jsx
import React from 'react';
import styles from './ResultsPage.module.css';

export default function ResultsPage({ 
  isWinner, 
  finalScore, 
  opponentScore, 
  xpEarned, 
  missedQuestions = [], 
  onRematch, 
  onReturnHome 
}) {
  return (
    <div className={styles.resultsWrapper}>
      
      {/* Dynamic Match Status Ribbon Block */}
      <div className={`${styles.outcomeBanner} ${isWinner ? styles.winBanner : styles.loseBanner}`}>
        <h1 className={styles.outcomeTitle}>{isWinner ? '🏆 MATCH VICTORY!' : '💀 DEFEAT'}</h1>
        <p className={styles.outcomeSubText}>
          {isWinner ? 'You absolutely dominated the matching pool.' : 'Gg! Time to hitting the study boards again.'}
        </p>
      </div>

      <div className={styles.resultsGrid}>
        {/* Metric Tally Breakdown Box */}
        <div className={styles.statsCard}>
          <h3 className={styles.sectionHeading}>PERFORMANCE METRICS</h3>
          
          <div className={styles.metricRow}>
            <span className={styles.metricLabel}>Your Final Score</span>
            <span className={`${styles.metricVal} ${styles.blueVal}`}>{finalScore} PTS</span>
          </div>
          <div className={styles.metricRow}>
            <span className={styles.metricLabel}>Opponent Score</span>
            <span className={styles.metricVal}>{opponentScore} PTS</span>
          </div>
          <div className={styles.metricRow}>
            <span className={styles.metricLabel}>Progression Yield</span>
            <span className={`${styles.metricVal} ${styles.yellowVal}`}>+{xpEarned} XP</span>
          </div>

          <div className={styles.actionButtonGroup}>
            <button onClick={onRematch} className={styles.rematchBtn}>
              💥 INSTANT REMATCH
            </button>
            <button onClick={onReturnHome} className={styles.homeBtn}>
              RETURN TO DASHBOARD
            </button>
          </div>
        </div>

        {/* SRS Feature Link: Personal Error Log Stack */}
        <div className={styles.errorLogCard}>
          <div className={styles.errorHeaderRow}>
            <h3 className={styles.sectionHeading}>NEEDS REVIEW LOG</h3>
            <span className={styles.errorCountBadge}>{missedQuestions.length} SAVED</span>
          </div>
          <p className={styles.errorDescription}>
            These items were automatically compiled into your permanent review deck.
          </p>

          <div className={styles.missedScrollDeck}>
            {missedQuestions.length > 0 ? (
              missedQuestions.map((item, index) => (
                <div key={index} className={styles.missedItemSlat}>
                  <div className={styles.missedQuestion}>❓ {item.question}</div>
                  <div className={styles.correctAnswer}>✓ Correct: <span className={styles.answerHighlight}>{item.answer}</span></div>
                </div>
              ))
            ) : (
              <div className={styles.perfectState}>
                <span>🎉 Flawless Score! No mistakes tracked to log stacks.</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}