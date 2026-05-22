import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameContext } from '../context/GameContext';
import FlashCard from '../components/FlashCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import styles from './GamePage.module.css';

const MOCK_QUESTION = {
  id: 'q1',
  term: 'What is the powerhouse of the cell?',
  definition: 'Mitochondria',
  choices: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi apparatus'],
};

export default function GamePage() {
  const { roomCode } = useParams();
  const { user } = useAuth();
  const { state } = useGameContext();

  const [answerMode, setAnswerMode] = useState('buttons');
  const [selected, setSelected] = useState(null);
  const [timerRunning, setTimerRunning] = useState(true);

  const question = state.currentQuestion || MOCK_QUESTION;

  function handleAnswer(answer) {
    if (selected) return;
    setSelected(answer);
    setTimerRunning(false);
  }

  function handleTimerExpire() {
    if (!selected) setSelected('__expired__');
  }

  const myScore   = state.myScore ?? 0;
  const oppScore  = state.opponentScore ?? 0;
  const total     = state.totalQuestions || 10;
  const qIdx      = state.questionIndex ?? 0;
  const opponent  = state.players?.find(p => p.username !== user?.username);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.scorePanel}>
          <ProgressBar
            myName={user?.username || 'You'}
            opponentName={opponent?.username || 'Opponent'}
            myScore={myScore}
            opponentScore={oppScore}
            total={total * 100}
          />
        </div>
        <div className={styles.questionBadge}>Q {qIdx + 1} / {total}</div>
      </div>

      <div className={styles.timerWrap}>
        <Timer
          seconds={15}
          onExpire={handleTimerExpire}
          running={timerRunning && !selected}
        />
      </div>

      <div className={styles.modeToggle}>
        <button
          className={answerMode === 'buttons' ? styles.modeActive : styles.modeBtn}
          onClick={() => setAnswerMode('buttons')}
        >
          Multiple choice
        </button>
        <button
          className={answerMode === 'typing' ? styles.modeActive : styles.modeBtn}
          onClick={() => setAnswerMode('typing')}
        >
          Type answer
        </button>
      </div>

      <div className={styles.cardWrap}>
        <FlashCard
          question={question}
          mode={answerMode}
          onAnswer={handleAnswer}
          disabled={Boolean(selected)}
          selected={selected}
          correct={question.definition}
        />
      </div>

      {selected && selected !== '__expired__' && (
        <div className={`${styles.feedback} ${selected === question.definition ? styles.correct : styles.wrong}`}>
          {selected === question.definition
            ? '✓ Correct! +100 pts'
            : `✗ Wrong! The answer was: ${question.definition}`}
        </div>
      )}
      {selected === '__expired__' && (
        <div className={`${styles.feedback} ${styles.wrong}`}>
          ⏱ Time up! The answer was: {question.definition}
        </div>
      )}

      <p className={styles.note}>Live sync via WebSocket will be connected in Phase 4.</p>
    </div>
  );
}