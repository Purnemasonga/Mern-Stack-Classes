import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fd_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [token, setToken] = useState(() => localStorage.getItem('fd_token') || null);

  function login(userData, authToken) {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('fd_user', JSON.stringify(userData));
    localStorage.setItem('fd_token', authToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fd_user');
    localStorage.removeItem('fd_token');
  }

  function updateUser(partial) {
    setUser(prev => {
      const updated = { ...prev, ...partial };
      localStorage.setItem('fd_user', JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
}