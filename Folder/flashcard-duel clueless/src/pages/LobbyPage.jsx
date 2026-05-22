// src/pages/LobbyPage.jsx
import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import styles from './LobbyPage.module.css';

export default function LobbyPage({ roomCode, players = [], onToggleReady, isReady }) {
  return (
    <div className={styles.lobbyLayout}>
      
      {/* Left Column: Room Code Display & Player Status Slats */}
      <div className={styles.metaColumn}>
        <div className={styles.codeCard}>
          <span className={styles.cardContext}>MATCH ROOM CODE</span>
          <h2 className={styles.roomCodeDisplay}>{roomCode || '------'}</h2>
          <p className={styles.invitePrompt}>Share this code with a teammate to start the duel!</p>
        </div>

        <div className={styles.playerStatusCard}>
          <h3 className={styles.sectionHeader}>CONNECTED PLAYERS</h3>
          <div className={styles.playerList}>
            {players.map((player, idx) => (
              <div key={idx} className={styles.playerSlat}>
                <div className={styles.playerIdentity}>
                  <span className={styles.playerAvatar}>🎮</span>
                  <span className={styles.playerName}>{player.username}</span>
                </div>
                <span className={`${styles.readyIndicator} ${player.isReady ? styles.statusActive : styles.statusWaiting}`}>
                  {player.isReady ? 'READY' : 'WAITING...'}
                </span>
              </div>
            ))}
            {players.length < 2 && (
              <div className={`${styles.playerSlat} ${styles.slatEmpty}`}>
                <span>⏳ Waiting for opponent to jump in...</span>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={onToggleReady} 
          className={`${styles.readyBtn} ${isReady ? styles.readyActive : ''}`}
        >
          {isReady ? '✓ CHILLING (READY)' : 'LOCK IN STATUS (READY UP) ⚡'}
        </button>
      </div>

      {/* Right Column: Embedded Room Chat Box */}
      <div className={styles.chatColumn}>
        <ChatBox roomCode={roomCode} />
      </div>

    </div>
  );
}