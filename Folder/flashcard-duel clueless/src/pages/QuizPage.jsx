// src/pages/QuizPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestions } from '../context/QuestionContext';
import styles from './QuizPage.module.css';

export default function QuizPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { decks } = useQuestions();

  // Load target dataset array dynamically based on routing state indices
  const currentDeckQuestions = decks[deckId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentInput, setStudentInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestionItem = currentDeckQuestions[currentIndex];

  const handleVerifyAnswerSubmit = (e) => {
    e.preventDefault();
    if (!currentQuestionItem) return;

    const answerMatches = studentInput.trim().toLowerCase() === currentQuestionItem.answer.toLowerCase();
    setIsCorrect(answerMatches);
    if (answerMatches) setScore(prev => prev + 100);
    setShowFeedback(true);
  };

  const handleNextStepProgression = () => {
    setShowFeedback(false);
    setStudentInput('');
    if (currentIndex + 1 < currentDeckQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed full pool loop cycle! Forward to global match wrap statistics card
      navigate('/');
    }
  };

  if (currentDeckQuestions.length === 0) {
    return (
      <div className={styles.quizWrapper} style={{textAlign: 'center', paddingTop: '6rem'}}>
        <h2 className={styles.cardHeaderTitle}>⚠️ Empty Question Cache Deck</h2>
        <p style={{fontWeight: 700, margin: '1rem 0 2rem 0'}}>Admin hasn't seeded CSV data tracks for this workspace id code folder yet.</p>
        <button onClick={() => navigate('/')} className={styles.submitVerifyBtn} style={{width: 'auto', display: 'inline-block'}}>RETURN HOME</button>
      </div>
    );
  }

  return (
    <div className={styles.quizWrapper}>
      
      {/* Top Status Indicators bar */}
      <div className={styles.statusBarRow}>
        <span className={styles.cardIndicatorBadge}>ITEM {currentIndex + 1} OF {currentDeckQuestions.length}</span>
        <span className={styles.currentRunningPoints}>🏆 SCORE: {score} PTS</span>
      </div>

      {/* Main Study Flashcard Container Block */}
      <div className={styles.studyQuestionFlashcard}>
        <div className={styles.questionPromptBlock}>
          <span className={styles.cardTagHeader}>QUESTION FOCUS</span>
          <p className={styles.mainPromptBodyText}>{currentQuestionItem.question}</p>
        </div>

        {!showFeedback ? (
          <form onSubmit={handleVerifyAnswerSubmit} className={styles.inputActionFormTray}>
            <input 
              type="text" 
              placeholder="TYPE CACHED IDENTIFIER ANSWER MATCH HERE..."
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
              className={styles.flashcardResponseInput}
              required
              autoFocus
            />
            <button type="submit" className={styles.submitVerifyBtn}>
              VERIFY EXAM MATCH →
            </button>
          </form>
        ) : (
          <div className={`${styles.feedbackSlatBox} ${isCorrect ? styles.correctAlertMint : styles.errorAlertCrimson}`}>
            <h3 style={{margin: 0, fontSize: '1.4rem'}}>{isCorrect ? '🎯 EXCELLENT MATCH!' : '💀 RE-REVIEW REQD'}</h3>
            <p style={{margin: '0.4rem 0 1.5rem 0', fontWeight: 600}}>
              Expected Key: <strong style={{textDecoration: 'underline'}}>{currentQuestionItem.answer}</strong>
            </p>
            <button onClick={handleNextStepProgression} className={styles.submitVerifyBtn}>
              {currentIndex + 1 < currentDeckQuestions.length ? 'CONTINUE TRAJECTORY →' : 'FINALIZE PROGRESS REVIEW'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}