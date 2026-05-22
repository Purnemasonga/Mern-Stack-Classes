// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (username.trim()) {
      if (typeof onLogin === 'function') {
        onLogin({ 
          username: username.trim(), 
          email: email.trim(), 
          role: role 
        });
      }
      
      // Navigate right away based on selection
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className={styles.authLayoutContainer}>
      <div className={styles.promoSide}>
        <div className={styles.floatingTag}>ONLINE MULTIPLAYER QUIZ</div>
        <h1 className={styles.massiveTitle}>ARE YOU READY TO DUEL?</h1>
        <p className={styles.promoDescription}>
          Connect with students globally, master high-stakes flashcard decks, and defend your rank streak in real time.
        </p>
      </div>

      <div className={styles.formPanelCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.formTitle}>LOCK IN ACCOUNT</h2>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          
          <div className={styles.fieldBlock}>
            <label className={styles.brutalLabel}>CHOOSE YOUR ROLE</label>
            <div className={styles.roleTabGroup}>
              <button
                type="button"
                className={`${styles.roleTabBtn} ${role === 'student' ? styles.roleActiveGreen : ''}`}
                onClick={() => setRole('student')}
              >
                🎓 STUDENT
              </button>
              <button
                type="button"
                className={`${styles.roleTabBtn} ${role === 'admin' ? styles.roleActivePurple : ''}`}
                onClick={() => setRole('admin')}
              >
                👑 ADMIN
              </button>
            </div>
          </div>

          <div className={styles.fieldBlock}>
            <label className={styles.brutalLabel}>CHOOSE USERNAME</label>
            <input 
              type="text" 
              placeholder="e.g., magic"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.brutalInput}
              required
            />
          </div>

          <div className={styles.fieldBlock}>
            <label className={styles.brutalLabel}>EMAIL ADDRESS (OPTIONAL)</label>
            <input 
              type="email" 
              placeholder="magicmushroom@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.brutalInput}
            />
          </div>

          <button type="submit" className={styles.enterArenaBtn}>
            ENTER THE MULTIPLAYER ARENA ⚡
          </button>
        </form>
      </div>
    </div>
  );
}