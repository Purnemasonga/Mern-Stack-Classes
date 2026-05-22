import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import Adminpage from './pages/Adminpage'; // Imported your admin page

// A clean wrapper that provides the Navbar ONLY if the user is authenticated
function ProtectedLayout({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  const { user, login } = useAuth(); // Destructuring login utility from your useAuth hook

  return (
    <Routes>
      {/* Public Login Route - Redirects straight away if someone is already logged in */}
      <Route 
        path="/login" 
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? "/admin" : "/"} replace />
          ) : (
            <LoginPage onLogin={login} />
          )
        } 
      />

      {/* Admin Panel Route - Guarded by both login state and role requirements */}
      <Route 
        path="/admin" 
        element={
          user && user.role === 'admin' ? (
            <>
              <Navbar />
              <Adminpage />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Standard Core Application Protected Pathways */}
      <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
      <Route path="/deck/new" element={<ProtectedLayout><DeckBuilderPage /></ProtectedLayout>} />
      <Route path="/deck/:deckId/edit" element={<ProtectedLayout><DeckBuilderPage /></ProtectedLayout>} />
      <Route path="/lobby/:roomCode" element={<ProtectedLayout><LobbyPage /></ProtectedLayout>} />
      <Route path="/game/:roomCode" element={<ProtectedLayout><GamePage /></ProtectedLayout>} />
      <Route path="/results/:roomCode" element={<ProtectedLayout><ResultsPage /></ProtectedLayout>} />

      {/* Wildcard Fallback redirection handler */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}