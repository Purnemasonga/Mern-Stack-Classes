import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { socket } from '../sockets/socketManager';
import useAuthStore from '../store/useAuthStore';
import useGameStore from '../store/useGameStore';
import { motion } from 'framer-motion';

const GameRoom = () => {
  const { type } = useParams(); // 'quick' or 'private'
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get('deck');
  
  const { user } = useAuthStore();
  const game = useGameStore();
  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    socket.connect();

    if (type === 'quick' && deckId) {
      game.setStatus('matchmaking');
      socket.emit('join_quick_play', { userId: user._id, deckId });
    } else if (type === 'host' && deckId) {
      game.setStatus('matchmaking');
      socket.emit('host_private_room', { userId: user._id, deckId });
    }

    socket.on('waiting_in_queue', () => game.setStatus('matchmaking'));

    socket.on('match_found', ({ roomCode }) => {
      game.setRoomInfo(roomCode, deckId);
      game.setStatus('waiting'); 
    });

    socket.on('room_created', ({ roomCode }) => {
      game.setRoomInfo(roomCode, deckId);
      game.setStatus('waiting');
    });

    socket.on('player_joined', ({ state }) => game.setPlayers(state.players));
    socket.on('player_ready_state', ({ players }) => game.setPlayers(players));

    socket.on('game_starting', ({ countdown }) => {
      setCountdown(countdown);
      let t = countdown;
      const interval = setInterval(() => {
        t -= 1;
        setCountdown(t);
        if (t <= 0) {
          clearInterval(interval);
          game.setStatus('active');
        }
      }, 1000);
    });

    socket.on('next_question', ({ questionIndex, totalQuestions, card }) => {
      game.setCurrentQuestion(questionIndex);
    });

    return () => {
      if (type === 'quick') {
        socket.emit('leave_quick_play', { userId: user._id, deckId });
      }
      socket.disconnect();
      game.resetGame();
    };
  }, [type, deckId, user]);

  const handleReady = () => {
    setIsReady(true);
    socket.emit('player_ready', { roomCode: game.roomCode, userId: user._id });
  };

  if (game.status === 'matchmaking') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-bg-main relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-bg-card1 rounded-full opacity-60 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bg-card3 rounded-[40px] rotate-45 opacity-60 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 border-4 border-black/10 border-t-text-main rounded-full animate-spin mx-auto mb-8"></div>
          <h2 className="text-4xl font-display font-bold text-text-main mb-2">Finding Match...</h2>
          <p className="text-text-muted text-lg">Looking for an opponent in this event</p>
        </div>
      </div>
    );
  }

  if (game.status === 'waiting') {
    return (
      <div className="max-w-3xl mx-auto w-full mt-12 px-4">
        <div className="bg-white p-12 rounded-[50px] shadow-neo border border-gray-100 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-bg-card2 rounded-bl-full -z-0 opacity-50"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-display font-bold text-text-main">Match Found!</h2>
            <div className="text-lg text-text-muted mt-2">
              Room Code: <span className="font-mono bg-gray-100 px-4 py-1 rounded-full text-text-main font-bold tracking-widest">{game.roomCode}</span>
            </div>
          </div>
          
          <div className="flex justify-around items-center py-8 relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-bg-card1 text-text-main rounded-full flex items-center justify-center mb-4 border border-black/5 shadow-sm">
                <span className="text-3xl font-display font-bold">{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <span className="font-bold text-xl text-text-main">{user.username}</span>
              <span className={`text-sm mt-2 font-bold px-4 py-1 rounded-full ${isReady ? 'bg-bg-card2 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                {isReady ? 'Ready' : 'Waiting...'}
              </span>
            </div>
            
            <div className="text-5xl font-display font-black text-gray-200 italic">VS</div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-bg-card3 text-text-main rounded-[30px] rotate-12 flex items-center justify-center mb-4 border border-black/5 shadow-sm">
                <span className="text-3xl font-display font-bold -rotate-12">?</span>
              </div>
              <span className="font-bold text-xl text-text-main">Opponent</span>
              <span className="text-sm mt-2 font-bold px-4 py-1 rounded-full bg-gray-100 text-gray-500">Waiting...</span>
            </div>
          </div>

          <div className="relative z-10">
            {countdown !== null ? (
              <div className="text-5xl font-display font-black text-text-main animate-pulse">
                Starting in {countdown}...
              </div>
            ) : (
              <button 
                className={`btn px-12 py-4 text-xl shadow-neo ${isReady ? 'bg-bg-card2 text-green-900 border border-green-200' : 'btn-primary'}`}
                onClick={handleReady}
                disabled={isReady}
              >
                {isReady ? 'Ready!' : 'Ready Up'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (game.status === 'active') {
    return (
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-4 pb-8">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-12 bg-white rounded-full p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 pl-4">
            <span className="font-bold text-xl text-text-main">{user.username}</span>
            <span className="text-3xl font-display font-black text-text-main bg-bg-card1 w-12 h-12 flex items-center justify-center rounded-full">0</span>
          </div>
          <div className="text-text-muted font-bold tracking-widest uppercase text-sm">Question {game.currentQuestionIndex + 1}</div>
          <div className="flex items-center gap-4 pr-4">
            <span className="text-3xl font-display font-black text-text-main bg-bg-card3 w-12 h-12 flex items-center justify-center rounded-full">0</span>
            <span className="font-bold text-xl text-text-main">Opponent</span>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-center text-text-main leading-tight max-w-3xl">
            What is the capital of France?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <button className="bg-bg-card1 p-8 rounded-[40px] text-2xl text-text-main font-bold hover:shadow-neo transition-all border border-black/5 hover:-translate-y-1">Paris</button>
            <button className="bg-white p-8 rounded-[40px] text-2xl text-text-main font-bold hover:shadow-neo transition-all border border-gray-200 hover:-translate-y-1 hover:border-gray-300">London</button>
            <button className="bg-white p-8 rounded-[40px] text-2xl text-text-main font-bold hover:shadow-neo transition-all border border-gray-200 hover:-translate-y-1 hover:border-gray-300">Berlin</button>
            <button className="bg-white p-8 rounded-[40px] text-2xl text-text-main font-bold hover:shadow-neo transition-all border border-gray-200 hover:-translate-y-1 hover:border-gray-300">Madrid</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GameRoom;
