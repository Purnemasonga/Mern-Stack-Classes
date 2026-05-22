import { create } from 'zustand';

const useGameStore = create((set) => ({
  roomCode: null,
  deckId: null,
  players: [],
  status: 'idle', // idle, matchmaking, waiting, active, completed
  currentQuestionIndex: 0,
  flashcards: [],
  
  setRoomInfo: (roomCode, deckId) => set({ roomCode, deckId }),
  setPlayers: (players) => set({ players }),
  setStatus: (status) => set({ status }),
  setFlashcards: (flashcards) => set({ flashcards }),
  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),
  resetGame: () => set({ 
    roomCode: null, 
    deckId: null, 
    players: [], 
    status: 'idle', 
    currentQuestionIndex: 0, 
    flashcards: [] 
  })
}));

export default useGameStore;
