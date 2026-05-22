import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2 } from 'lucide-react';
import api from '../api/axiosConfig';

const DeckBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveDeck = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: Create the Deck
      const { data: deck } = await api.post('/api/decks', {
        title,
        description,
        category,
        isPublic
      });
      
      // Step 2: Normally we'd also post the flashcards here, but for simplicity we'll just redirect
      // In a full impl, we'd have a list of cards in state and submit them in bulk or one by one
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create deck', error);
      alert('Failed to create deck');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create New Deck</h1>
      </div>

      <div className="glass-panel p-6">
        <form id="deck-form" onSubmit={handleSaveDeck} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
              <input 
                type="text" 
                required 
                className="input-field" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
              <select 
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Languages">Languages</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea 
                className="input-field min-h-[100px]" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input 
                type="checkbox" 
                id="isPublic" 
                className="w-4 h-4 rounded bg-dark-bg border-dark-border text-primary focus:ring-primary"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-slate-300">
                Make this deck public (visible to everyone)
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="glass-panel p-6 border-dashed border-2 border-slate-700 bg-dark-bg/50 text-center py-12">
        <h3 className="text-xl font-bold mb-2 text-slate-400">Flashcards Section</h3>
        <p className="text-slate-500 mb-4">In a complete implementation, you would add individual flashcards here.</p>
        <button className="btn btn-secondary flex items-center gap-2 mx-auto">
          <Plus size={16} /> Add Card
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
          Cancel
        </button>
        <button 
          form="deck-form" 
          type="submit" 
          className="btn btn-primary flex items-center gap-2"
          disabled={loading}
        >
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
          Save Deck
        </button>
      </div>
    </div>
  );
};

export default DeckBuilder;
