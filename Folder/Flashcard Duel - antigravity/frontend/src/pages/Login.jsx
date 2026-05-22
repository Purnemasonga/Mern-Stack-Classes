import { useState } from 'react';
import { Link, useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get('admin') === 'true';

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { parallax } = useOutletContext(); // Inherit parallax

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      // We assume backend redirects appropriately or handles role auth, 
      // otherwise we just send to dashboard.
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center pointer-events-none relative z-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="pointer-events-auto w-full max-w-md"
        style={{
          x: parallax ? parallax(-10).x : 0,
          y: parallax ? parallax(-10).y : 0,
        }}
      >
        <div className="bg-premium-charcoal/80 backdrop-blur-2xl rounded-4xl p-10 shadow-cinematic border border-white/10 relative overflow-hidden group">
          
          {/* Subtle internal glow matching the premium palette */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-premium-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-premium-purple/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-display font-bold text-premium-cream">
              {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-premium-slate font-medium">
              Enter your credentials to continue
            </p>
          </div>
          
          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger px-6 py-4 rounded-2xl text-sm text-center font-bold mb-6">
              {error}
            </div>
          )}

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${focusedInput === 'email' ? 'text-premium-cream' : 'text-premium-slate'}`} size={20} />
                <input
                  type="email"
                  required
                  className={`w-full bg-premium-black/50 border rounded-2xl px-5 pl-14 py-4 text-premium-cream placeholder-premium-slate transition-all outline-none focus:bg-premium-black shadow-inner ${focusedInput === 'email' ? 'border-premium-yellow/50 shadow-[0_0_15px_rgba(245,176,65,0.15)]' : 'border-white/10 hover:border-white/20'}`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              
              <div className="relative">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${focusedInput === 'password' ? 'text-premium-cream' : 'text-premium-slate'}`} size={20} />
                <input
                  type="password"
                  required
                  className={`w-full bg-premium-black/50 border rounded-2xl px-5 pl-14 py-4 text-premium-cream placeholder-premium-slate transition-all outline-none focus:bg-premium-black shadow-inner ${focusedInput === 'password' ? 'border-premium-yellow/50 shadow-[0_0_15px_rgba(245,176,65,0.15)]' : 'border-white/10 hover:border-white/20'}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-8 bg-premium-cream text-premium-black text-lg font-bold rounded-2xl hover:bg-white active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(247,246,243,0.1)] flex justify-center items-center gap-2"
            >
              {isLoading ? 'Authenticating...' : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 relative z-10">
            <p className="text-premium-slate font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-premium-cream hover:text-premium-yellow transition-colors font-bold underline decoration-white/20 underline-offset-4 hover:decoration-premium-yellow">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
