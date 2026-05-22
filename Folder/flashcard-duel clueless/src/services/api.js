import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('fd_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('fd_token');
      localStorage.removeItem('fd_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
  me:       ()     => api.get('/auth/me'),
};

export const decksApi = {
  list:       ()         => api.get('/decks'),
  listPublic: (category) => api.get('/decks/public', { params: { category } }),
  get:        (id)       => api.get(`/decks/${id}`),
  create:     (data)     => api.post('/decks', data),
  update:     (id, data) => api.put(`/decks/${id}`, data),
  delete:     (id)       => api.delete(`/decks/${id}`),
};

export const matchApi = {
  createRoom: (deckId) => api.post('/match/room', { deckId }),
  joinRoom:   (code)   => api.post('/match/join', { roomCode: code }),
  quickPlay:  (deckId) => api.post('/match/quick', { deckId }),
};

export const leaderboardApi = {
  global: ()       => api.get('/leaderboard'),
  deck:   (deckId) => api.get(`/leaderboard/deck/${deckId}`),
};

export default api;