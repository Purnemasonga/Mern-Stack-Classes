import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, User, KeyRound, CheckSquare, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'STUDENT');
  const [studentMode, setStudentMode] = useState(location.state?.studentMode || 'SIGN UP');
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Login Sequence States
  const [loginSequence, setLoginSequence] = useState(0);
  const [userContext, setUserContext] = useState(null);

  const navigate = useNavigate();

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = studentMode === 'SIGN UP' ? '/api/auth/register' : '/api/auth/login';
    
    try {
      setLoading(true);
      const payload = { username, password };
      if (studentMode === 'SIGN UP') payload.email = email;
      
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Authentication failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUserContext(data.user);
      
      if (studentMode === 'SIGN UP') {
        navigate('/onboarding', { replace: true });
      } else {
        startLoginSequence();
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/auth/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: adminCode })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setTimeout(() => {
        localStorage.setItem('admin', 'true');
        navigate('/admin', { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const startLoginSequence = () => {
    setLoginSequence(1); // "ACCESS GRANTED"
    
    setTimeout(() => {
      setLoginSequence(2); // "INITIALIZING DUEL SYSTEM" + Player Info
    }, 600);
    
    setTimeout(() => {
      setLoginSequence(3); // Subjects checks
    }, 1400);
 
    setTimeout(() => {
      setLoginSequence(4); // "READY TO DUEL"
    }, 2200);

    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 2800);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div className="neo-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      
      {/* IMMERSIVE LOGIN SEQUENCE OVERLAY */}
      <AnimatePresence>
        {loginSequence > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, zIndex: 9000, 
              backgroundColor: 'var(--color-admin-container)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <div className="crt-overlay" />
            
            <motion.div 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="neo-box" 
              style={{ padding: '3rem', maxWidth: '600px', width: '100%', border: 'var(--border-thick)', backgroundColor: 'var(--color-bg)' }}
            >
              <AnimatePresence mode="wait">
                {loginSequence === 1 && (
                  <motion.div key="stage1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ textAlign: 'center' }}>
                    <h2 className="blink-fast" style={{ fontFamily: 'var(--font-8bit)', color: 'var(--color-success)', fontSize: '2rem', fontWeight: 900 }}>
                      ACCESS GRANTED
                    </h2>
                  </motion.div>
                )}

                {loginSequence >= 2 && loginSequence <= 3 && (
                  <motion.div key="stage2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <h2 style={{ fontFamily: 'var(--font-8bit)', color: 'var(--color-text)', fontSize: '1.2rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
                      INITIALIZING DUEL SYSTEM...
                    </h2>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '4px dashed var(--color-border)' }}>
                      <div className="neo-box bg-primary" style={{ padding: '1rem', flex: 1, backgroundColor: 'var(--color-primary)' }}>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-8bit)', display: 'block', marginBottom: '0.5rem' }}>AGENT</span>
                        <div style={{ fontWeight: 900, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <User size={20} /> {userContext?.username.toUpperCase()}
                        </div>
                      </div>
                      <div className="neo-box bg-secondary" style={{ padding: '1rem', flex: 1, backgroundColor: 'var(--color-secondary)' }}>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-8bit)', display: 'block', marginBottom: '0.5rem' }}>STATUS</span>
                        <div style={{ fontWeight: 900, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Zap size={20} /> LVL {Math.floor((userContext?.xp || 0) / 100) + 1}
                        </div>
                      </div>
                    </div>

                    {loginSequence === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                        {[
                          "DATA STRUCTURES", "ALGORITHMS", "DBMS", "OPERATING SYSTEMS", 
                          "CYBER SECURITY", "AI FUNDAMENTALS", "WEB DEVELOPMENT", "MACHINE LEARNING"
                        ].map((mod, idx) => (
                          <motion.div key={mod} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-8bit)', fontSize: '0.65rem' }}>
                            <CheckSquare size={14} color="var(--color-success)" /> {mod}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {loginSequence === 4 && (
                  <motion.div key="stage4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bounce-3d" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'var(--font-8bit)', color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 900, textShadow: '4px 4px 0px var(--color-border)' }}>
                      READY TO DUEL
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="neo-box" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          padding: '3rem 2.5rem', 
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '3.5rem', 
            fontWeight: 900, 
            letterSpacing: '-2px', 
            color: 'var(--color-primary)',
            marginBottom: '0.5rem',
            lineHeight: 1
          }}>
            FLASHCARD DUEL
          </h1>
          <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 600 }}>
            The Competitive Study Arena
          </p>
        </motion.div>
        
        {/* Main Tabs */}
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
          <button 
            className="neo-button"
            style={{ 
              flex: 1, 
              backgroundColor: activeTab === 'STUDENT' ? 'var(--color-primary)' : 'transparent', 
              color: activeTab === 'STUDENT' ? 'var(--color-bg)' : 'var(--color-text)',
              borderColor: activeTab === 'STUDENT' ? 'transparent' : 'var(--color-border)',
              padding: '12px'
            }}
            onClick={() => { setActiveTab('STUDENT'); setError(''); }}
          >
            STUDENT
          </button>
          <button 
            className="neo-button"
            style={{ 
              flex: 1, 
              backgroundColor: activeTab === 'ADMIN' ? 'var(--color-crimson)' : 'transparent', 
              color: activeTab === 'ADMIN' ? 'white' : 'var(--color-text)',
              borderColor: activeTab === 'ADMIN' ? 'transparent' : 'var(--color-border)',
              padding: '12px'
            }}
            onClick={() => { setActiveTab('ADMIN'); setError(''); }}
          >
            ADMIN
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              style={{ marginBottom: '1.5rem', overflow: 'hidden' }}
            >
              <div className="neo-box bg-crimson" style={{ padding: '1rem', color: 'white', fontWeight: 800, fontSize: '0.9rem', border: 'var(--border-thick)' }}>
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab === 'STUDENT' ? (
            <motion.div 
              key="student-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', justifyContent: 'center' }}>
                <button 
                  style={{ 
                    background: 'none', border: 'none', 
                    color: 'var(--color-text)',
                    textDecoration: studentMode === 'SIGN UP' ? 'underline' : 'none',
                    textDecorationThickness: '4px',
                    textUnderlineOffset: '8px',
                    textDecorationColor: 'var(--color-primary)',
                    fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem', fontFamily: 'var(--font-display)',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setStudentMode('SIGN UP')}
                >
                  REGISTER
                </button>
                <button 
                  style={{ 
                    background: 'none', border: 'none', 
                    color: 'var(--color-text)',
                    textDecoration: studentMode === 'SIGN IN' ? 'underline' : 'none',
                    textDecorationThickness: '4px',
                    textUnderlineOffset: '8px',
                    textDecorationColor: 'var(--color-primary)',
                    fontWeight: 900, cursor: 'pointer', fontSize: '1.2rem', fontFamily: 'var(--font-display)',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setStudentMode('SIGN IN')}
                >
                  SIGN IN
                </button>
              </div>

              <form onSubmit={handleStudentSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontFamily: 'var(--font-8bit)', fontSize: '0.75rem' }}>USERNAME</label>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--color-text)' }}>
                        <User size={20} />
                      </div>
                      <input 
                        type="text" 
                        className="neo-input" 
                        placeholder="e.g. ByteHunter" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ paddingLeft: '48px' }}
                      />
                    </div>
                  </div>

                  {studentMode === 'SIGN UP' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontFamily: 'var(--font-8bit)', fontSize: '0.75rem' }}>EMAIL (OPTIONAL)</label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--color-text)' }}>
                          <Mail size={20} />
                        </div>
                        <input 
                          type="email" 
                          className="neo-input" 
                          placeholder="agent@duel.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ paddingLeft: '48px' }}
                        />
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontFamily: 'var(--font-8bit)', fontSize: '0.75rem' }}>PASSWORD</label>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--color-text)' }}>
                        <KeyRound size={20} />
                      </div>
                      <input 
                        type="password" 
                        className="neo-input" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={studentMode === 'SIGN UP'} 
                        style={{ paddingLeft: '48px' }}
                      />
                    </div>
                  </div>

                </div>
                <button type="submit" className="neo-button bg-mint" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} disabled={loading}>
                  {loading ? 'CONNECTING...' : (studentMode === 'SIGN UP' ? 'REGISTER & START →' : 'SIGN IN →')}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="admin-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleAdminSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                  <Lock size={28} />
                  <h2 style={{ fontWeight: 900, fontSize: '1.4rem', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Admin Portal</h2>
                </div>
                <p style={{ marginBottom: '2rem', fontWeight: 600, color: 'var(--color-text)', fontSize: '1rem', borderLeft: '4px solid var(--color-crimson)', paddingLeft: '1rem' }}>
                  Access the course management dashboard to create subjects and generate AI card decks.
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontFamily: 'var(--font-8bit)', fontSize: '0.75rem' }}>ADMIN ACCESS CODE</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--color-text)' }}>
                      <KeyRound size={20} />
                    </div>
                    <input 
                      type="password" 
                      className="neo-input" 
                      placeholder="Access Code"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      required
                      style={{ paddingLeft: '48px' }}
                    />
                  </div>
                </div>
                
                <button type="submit" className="neo-button bg-crimson" style={{ width: '100%', color: 'white', padding: '16px', fontSize: '1.1rem' }} disabled={loading}>
                  {loading ? 'VALIDATING...' : 'ENTER PORTAL →'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;
