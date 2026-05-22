// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './DashboardPage.module.css';

export default function DashboardPage({ onJoinRoom }) {
  const { user } = useAuth();
  const [roomInput, setRoomInput] = useState('');
  const [activeTab, setActiveTab] = useState('subjects');

  // Hardcoded engineering decks focused entirely on your core syllabus tracks
  const technicalDecks = [
    {
      id: 'ds-algo',
      title: 'Data Structures',
      topics: 'Binary Search Trees, Graphs, Sorting Algorithms',
      onlineCount: 84,
      colorClass: styles.greenCard,
      badge: '🌳 STRUCT'
    },
    {
      id: 'comp-forensics',
      title: 'Computer Forensics',
      topics: 'E-Discovery, Evidence Acquisition, Chain of Custody',
      onlineCount: 42,
      colorClass: styles.purpleCard,
      badge: '🔍 FORENSICS'
    },
    {
      id: 'cyber-sec',
      title: 'Cyber Security',
      topics: 'SQL Injection, Botnets, Network Steganography',
      onlineCount: 119,
      colorClass: styles.yellowCard,
      badge: '🛡️ SECURITY'
    }
  ];

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (roomInput.trim() && typeof onJoinRoom === 'function') {
      onJoinRoom(roomInput.trim());
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      
      {/* Dynamic Profile Hub Banner */}
      <div className={styles.profileHeroCard}>
        <div className={styles.identityGroup}>
          <span className={styles.statusPill}>
            {user?.role === 'admin' ? '⚡ ADMINISTRATOR' : '📝 STUDENT PORTAL'}
          </span>
          <h1 className={styles.usernameDisplay}>
            {user?.username ? user.username : 'Guest'}<span className={styles.cursorBlink}> _</span>
          </h1>
          <p className={styles.heroSubtext}>
            Ready to defend your score streak in the competitive matchmaking rings?
          </p>
        </div>

        {/* Live Metrics Grid Block */}
        <div className={styles.statsBoxSlat}>
          <div className={styles.statLine}>
            <span>🔥 STREAK</span>
            <strong>{user?.streak !== undefined ? user.streak : 0} DAYS</strong>
          </div>
          <div className={styles.statLine}>
            <span>⚡ TOTAL XP</span>
            <strong>{user?.xp !== undefined ? user.xp : 0} XP</strong>
          </div>
          <div className={styles.statLine}>
            <span>🏆 MATCHES</span>
            <strong>{user?.wins !== undefined ? user.wins : 0} WINS</strong>
          </div>
        </div>
      </div>

      {/* Matchmaking Private Gateway Row */}
      <form onSubmit={handleJoinSubmit} className={styles.matchmakingBar}>
        <span className={styles.barLabel}>⚔️ JOIN PRIVATE MATCH</span>
        <input 
          type="text" 
          placeholder="ENTER 6-DIGIT ROOM CODE" 
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          className={styles.roomBarInput}
        />
        <button type="submit" className={styles.joinActionBtn}>
          JOIN →
        </button>
      </form>

      {/* Tab Controls Menu */}
      <div className={styles.tabBarGroup}>
        <button 
          onClick={() => setActiveTab('subjects')}
          className={`${styles.tabElementBtn} ${activeTab === 'subjects' ? styles.tabActive : ''}`}
        >
          📁 SUBJECTS
        </button>
        <button 
          onClick={() => setActiveTab('leaderboard')}
          className={`${styles.tabElementBtn} ${activeTab === 'leaderboard' ? styles.tabActive : ''}`}
        >
          🏆 LEADERBOARD
        </button>
      </div>

      {/* Main Panel Content Render Area */}
      {activeTab === 'subjects' ? (
        <div className={styles.decksLayoutGrid}>
          {technicalDecks.map((deck) => (
            <div key={deck.id} className={`${styles.subjectCardSlat} ${deck.colorClass}`}>
              <div className={styles.cardInternalLayout}>
                <span className={styles.deckBadge}>{deck.badge}</span>
                <h2 className={styles.deckTitleText}>{deck.title}</h2>
                <p className={styles.deckTopicsSummary}>{deck.topics}</p>
                
                {/* Upgraded Dual Actions Option Tray */}
                <div className={styles.cardFooterMetrics}>
                  <span className={styles.liveIndicator}>🟢 {deck.onlineCount} in arena</span>
                  
                  <div className={styles.deckPlayButtonGroup}>
                    <button 
                      type="button"
                      onClick={() => console.log(`Launching Single Player Solo practice for: ${deck.id}`)}
                      className={styles.startSoloBtn}
                    >
                      SOLO 🧠
                    </button>
                    <button 
                      type="button"
                      onClick={() => console.log(`Entering Matchmaking queue for: ${deck.id}`)}
                      className={styles.startDuelBtn}
                    >
                      DUEL ⚔️
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.leaderboardWrapperBlock}>
          <div className={styles.leaderboardRow}>
            <span>🥇 1st. Sahi</span>
            <strong>42,900 XP</strong>
          </div>
          <div className={styles.leaderboardRow}>
            <span>🥈 2nd. {user?.username || 'You'}</span>
            <strong>{user?.xp || 9999} XP</strong>
          </div>
          <div className={styles.leaderboardRow}>
            <span>🥉 3rd. Sadhvi</span>
            <strong>8,450 XP</strong>
          </div>
        </div>
      )}

    </div>
  );
}