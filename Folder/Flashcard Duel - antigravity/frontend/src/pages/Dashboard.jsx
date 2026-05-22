import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Play, Star } from 'lucide-react';
import api from '../api/axiosConfig';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [publicDecks, setPublicDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Array of background colors for the cards to match the Dribbble vibe
  const cardColors = ['bg-bg-card1', 'bg-bg-card2', 'bg-bg-card3', 'bg-bg-card4'];

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const { data } = await api.get('/api/decks');
        setPublicDecks(data);
      } catch (error) {
        console.error('Failed to fetch decks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDecks();
  }, []);

  return (
    <div className="space-y-12 pb-12">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[40px] shadow-neo border border-gray-100">
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-center justify-center p-4 bg-bg-card1 rounded-full text-text-main shadow-neo rotate-12">
            <Star size={32} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-text-main">Dashboard</h1>
            <p className="text-text-muted mt-2 text-lg">Ready for your next event?</p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search decks..." 
              className="input-field pl-12 shadow-none border-gray-200"
            />
          </div>
          <Link to="/decks/new" className="btn btn-primary px-8 whitespace-nowrap">
            <Plus size={20} />
            Create
          </Link>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-text-main">
            Events with Friends
          </h2>
          <span className="text-text-muted cursor-pointer hover:text-text-main transition-colors text-xl font-bold tracking-widest">...</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicDecks.map((deck, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                key={deck._id} 
                className={`${cardColors[idx % cardColors.length]} rounded-[40px] p-8 flex flex-col group hover:shadow-neo transition-all border border-black/5`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2 text-text-main">{deck.title}</h3>
                    <p className="text-sm font-medium text-black/60">By {deck.creator?.username || 'Unknown'}</p>
                  </div>
                  <span className="bg-white/50 text-xs px-3 py-1.5 rounded-full text-text-main font-bold shadow-sm">
                    {deck.category}
                  </span>
                </div>
                
                <p className="text-black/70 mb-8 flex-1 line-clamp-2 text-lg">
                  {deck.description || 'No description provided.'}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-black/60 bg-white/40 px-4 py-2 rounded-full">{deck.cardCount} Cards</span>
                  <Link 
                    to={`/lobby/quick?deck=${deck._id}`} 
                    className="btn bg-white text-text-main hover:bg-gray-50 shadow-sm px-6 py-2"
                  >
                    Start <Play size={16} className="ml-1" fill="currentColor" />
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {publicDecks.length === 0 && (
              <div className="col-span-full text-center py-16 text-text-muted bg-white rounded-[40px] shadow-sm border border-gray-100">
                <p className="text-2xl font-display mb-4">No public decks found.</p>
                <Link to="/decks/new" className="btn btn-primary mx-auto inline-flex">Create the first one</Link>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
