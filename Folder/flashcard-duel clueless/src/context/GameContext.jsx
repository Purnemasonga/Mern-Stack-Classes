import { createContext, useContext, useReducer } from 'react';

const GameContext = createContext(null);

const initialState = {
  roomCode: null,
  deck: null,
  players: [],
  currentQuestion: null,
  questionIndex: 0,
  totalQuestions: 0,
  myScore: 0,
  opponentScore: 0,
  phase: 'idle',
  results: null,
  chatMessages: [],
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_ROOM':
      return { ...state, roomCode: action.payload.roomCode, deck: action.payload.deck, phase: 'lobby' };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'PLAYER_READY':
      return { ...state, players: state.players.map(p => p.id === action.payload ? { ...p, ready: true } : p) };
    case 'GAME_START':
      return { ...state, phase: 'playing', totalQuestions: action.payload.totalQuestions, questionIndex: 0, myScore: 0, opponentScore: 0 };
    case 'SET_QUESTION':
      return { ...state, currentQuestion: action.payload.question, questionIndex: action.payload.index };
    case 'UPDATE_SCORES':
      return { ...state, myScore: action.payload.myScore, opponentScore: action.payload.opponentScore };
    case 'CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'GAME_OVER':
      return { ...state, phase: 'results', results: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used inside GameProvider');
  return ctx;
}