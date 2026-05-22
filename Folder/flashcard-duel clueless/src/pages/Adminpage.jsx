// src/pages/Adminpage.jsx
import React, { useState, useRef } from 'react';
import { useQuestions } from '../context/QuestionContext';
import styles from './Adminpage.module.css';

export default function Adminpage() {
  const { seedCustomDeckQuestions } = useQuestions();
  const [activeTab, setActiveTab] = useState('overview');
  const [targetDeck, setTargetDeck] = useState('ds-algo');
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus('Processing dataset entries...');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        const parsedQuestions = lines.map((line, idx) => {
          const parts = line.split(',');
          return {
            id: idx + 1,
            question: parts[0]?.trim() || 'Empty Question',
            answer: parts[1]?.trim() || 'Empty Answer'
          };
        });

        if (parsedQuestions.length === 0) {
          throw new Error("No entries found");
        }

        seedCustomDeckQuestions(targetDeck, parsedQuestions);
        setUploadStatus(`🎉 Successfully loaded ${parsedQuestions.length} items into ${targetDeck}!`);
      } catch (err) {
        setUploadStatus('❌ Failed parsing CSV. Make sure format is: question,answer');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Admin Panel Header Block */}
      <div className={styles.adminHeaderBlock}>
        <div className={styles.titleInfo}>
          <span className={styles.adminBadge}>👑 ADMIN CONTROL PANEL</span>
          <h1 className={styles.adminMainTitle}>Welcome, admin</h1>
        </div>
        <div className={styles.systemStatusPill}>SYSTEM ONLINE ●</div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricGrid}>
        <div className={`${styles.metricCard} ${styles.purpleAccent}`}>
          <span className={styles.metricCount}>24</span>
          <span className={styles.metricLabel}>ACTIVE SESSIONS</span>
        </div>
        <div className={`${styles.metricCard} ${styles.blueAccent}`}>
          <span className={styles.metricCount}>348</span>
          <span className={styles.metricLabel}>TOTAL STUDENTS</span>
        </div>
        <div className={`${styles.metricCard} ${styles.yellowAccent}`}>
          <span className={styles.metricCount}>622</span>
          <span className={styles.metricLabel}>QUESTIONS</span>
        </div>
        <div className={`${styles.metricCard} ${styles.greenAccent}`}>
          <span className={styles.metricCount}>91</span>
          <span className={styles.metricLabel}>MATCHES TODAY</span>
        </div>
      </div>

      {/* Navigation Submenu */}
      <div className={styles.adminTabs}>
        <button className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabActive : ''}`} onClick={() => setActiveTab('overview')}>OVERVIEW</button>
        <button className={`${styles.tabBtn} ${activeTab === 'subjects' ? styles.tabActive : ''}`} onClick={() => setActiveTab('subjects')}>SUBJECTS</button>
        <button className={`${styles.tabBtn} ${activeTab === 'upload' ? styles.tabActive : ''}`} onClick={() => setActiveTab('upload')}>CSV UPLOAD</button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'upload' ? (
        <div className={styles.controlPanelDeck}>
          <h2 className={styles.panelTitle}>Bulk Import Question Banks via CSV</h2>
          
          <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '320px' }}>
            <label style={{ fontWeight: 800, fontSize: '0.8rem', color: '#ffffff' }}>TARGET SUBJECT DECK</label>
            <select 
              value={targetDeck} 
              onChange={(e) => setTargetDeck(e.target.value)}
              style={{ padding: '0.85rem', border: '2px solid #ffffff', borderRadius: '8px', background: '#222', color: '#fff', fontWeight: 700 }}
            >
              <option value="ds-algo">Data Structures</option>
              <option value="comp-forensics">Computer Forensics</option>
              <option value="cyber-sec">Cyber Security</option>
            </select>
          </div>

          <div className={styles.uploadInteractiveZone}>
            <input type="file" accept=".csv" ref={fileInputRef} onChange={handleCSVUpload} style={{ display: 'none' }} />
            <button onClick={() => fileInputRef.current.click()} className={styles.brutalActionBtn}>
              📂 SELECT CSV FILE
            </button>
            {uploadStatus && <div className={styles.statusBannerText}>{uploadStatus}</div>}
          </div>
        </div>
      ) : (
        <div className={styles.splitMainDashboardLayout}>
          <div className={styles.controlPanelDeck}>
            <h3 className={styles.panelTitle}>Live Sessions Chart</h3>
            <div className={styles.mockChartVisual}>
              <div style={{ height: '60%' }}></div>
              <div style={{ height: '40%' }}></div>
              <div style={{ height: '90%' }}></div>
              <div style={{ height: '75%' }}></div>
            </div>
          </div>
          
          <div className={styles.controlPanelDeck}>
            <h3 className={styles.panelTitle}>Quick Actions</h3>
            <div className={styles.verticalActionList}>
              <button className={styles.slatActionBtn} onClick={() => setActiveTab('upload')}>+ Add Questions From CSV</button>
              <button className={styles.slatActionBtn}>Manage Subjects</button>
              <button className={styles.slatActionBtn}>View System Reports</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}