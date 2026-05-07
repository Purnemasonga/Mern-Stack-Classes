import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow p-5">
        <h1 className="display-4 mb-4">Welcome to Home Page</h1>
        <div className="d-flex justify-content-center gap-3">
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/')}
          >
            Go to Register
          </button>
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;