// src/components/ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.css';

export default function ChatBox({ messages = [], onSendMessage }) {
  const [textInput, setTextInput] = useState('');
  const chatBottomRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      onSendMessage(textInput);
      setTextInput('');
    }
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatTerminal}>
      <div className={styles.terminalHeader}>
        <span className={styles.terminalDot}></span>
        <h3 className={styles.terminalTitle}>LOBBY TEXT FEED</h3>
      </div>

      {/* Messages Scrolling Hub */}
      <div className={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.bubbleWrapper} ${msg.isSystem ? styles.systemWrapper : ''}`}>
            <div className={`${styles.chatBubble} ${msg.isSystem ? styles.systemBubble : styles.userBubble}`}>
              <span className={styles.authorTag}>{msg.user}:</span>
              <p className={styles.bodyText}>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Action Form Footer */}
      <form onSubmit={handleSend} className={styles.terminalFooter}>
        <input 
          type="text" 
          placeholder="Send a trash-talk message..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendIconBtn}>
          💬
        </button>
      </form>
    </div>
  );
}