// src/components/FlashCard.jsx
import React from 'react';
import styles from './FlashCard.module.css';

export default function FlashCard({ 
  question, 
  options, 
  onAnswer, 
  isTypingMode, 
  typedAnswer, 
  setTypedAnswer, 
  handleSubmitTyped 
}) {
  return (
    <div className={styles.arenaCard}>
      {/* Question Zone */}
      <div className={styles.questionSection}>
        <span className={styles.cardTypeBadge}>
          {isTypingMode ? '⌨️ TYPING MODE' : '🔘 MULTIPLE CHOICE'}
        </span>
        <h2 className={styles.questionText}>{question}</h2>
      </div>

      {/* Answer Inputs Zone */}
      <div className={styles.answerSection}>
        {isTypingMode ? (
          <form onSubmit={handleSubmitTyped} className={styles.typingForm}>
            <input
              type="text"
              placeholder="Type your precise answer here..."
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              className={styles.brutalInput}
              autoFocus
            />
            <button type="submit" className={styles.submitBtn}>
              SUBMIT ANSWER ⚡
            </button>
          </form>
        ) : (
          <div className={styles.optionsGrid}>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className={styles.optionBtn}
                style={{ '--btn-index': index }}
              >
                <span className={styles.optionIndex}>{String.fromCharCode(65 + index)}</span>
                <span className={styles.optionValue}>{option}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}