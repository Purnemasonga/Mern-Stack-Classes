import { Link, useNavigate } from 'react-router-dom';
import { Zap, User, LogOut } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel mx-4 mt-4 sticky top-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-wider">
              <div className="bg-primary p-1.5 rounded-lg">
                <Zap size={24} className="text-white fill-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Flashcard Duel
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-dark-border mx-2"></div>
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white">
                    <User size={18} />
                    {user?.username}
                  </Link>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-danger transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="btn btn-primary text-sm py-1.5">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
