// src/context/QuestionContext.jsx
import React, { createContext, useContext, useState } from 'react';

const QuestionContext = createContext();

export function useQuestions() {
  const context = useContext(QuestionContext);
  if (!context) {
    // Graceful fallback to prevent white-screen component crashes if provider isn't mounted yet
    return {
      decks: {},
      seedCustomDeckQuestions: () => {}
    };
  }
  return context;
}

export function QuestionProvider({ children }) {
  const [decks, setDecks] = useState({
    'ds-algo': [
      { id: 1, question: 'What is the average time complexity for searching an element in a balanced Binary Search Tree (BST)?', answer: 'O(log n)' },
      { id: 2, question: 'Which data structure follows the Last-In-First-Out (LIFO) property?', answer: 'Stack' }
    ],
    'comp-forensics': [
      { id: 1, question: 'What legal process standard ensures digital evidence collection tracking stays valid?', answer: 'Chain of Custody' }
    ],
    'cyber-sec': [
      { id: 1, question: 'What web vulnerability type injects malicious strings into input fields to read backend database tables?', answer: 'SQL Injection' }
    ]
  });

  const seedCustomDeckQuestions = (deckId, incomingQuestionsList) => {
    if (!deckId) return;
    setDecks((prevDecks) => ({
      ...prevDecks,
      [deckId]: incomingQuestionsList || []
    }));
  };

  return (
    <QuestionContext.Provider value={{ decks, seedCustomDeckQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
}