import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import api from '../api/axiosConfig';

const Profile = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/api/users/profile');
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  if (!profile) return <div className="text-center py-12 text-text-muted font-bold">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-10 flex items-center gap-8 rounded-[40px] shadow-neo border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-bg-card4 rounded-bl-full -z-0 opacity-50"></div>
        
        <div className="relative z-10 w-32 h-32 rounded-[30px] rotate-6 bg-bg-card2 flex items-center justify-center text-5xl font-display font-bold text-text-main shadow-sm border border-black/5">
          <div className="-rotate-6">
            {profile.username.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-display font-bold mb-2 text-text-main">{profile.username}</h1>
          <p className="text-text-muted font-bold text-lg bg-gray-50 px-4 py-1 inline-block rounded-full border border-gray-200">
            Level {profile.level} • {profile.xp} XP
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-bg-card1 p-8 rounded-[40px] text-center shadow-sm border border-black/5 hover:-translate-y-2 transition-transform">
          <div className="text-6xl font-display font-black text-text-main mb-2">{profile.stats?.wins || 0}</div>
          <div className="text-text-main uppercase tracking-widest text-sm font-bold bg-white/50 px-4 py-2 rounded-full inline-block">Wins</div>
        </div>
        <div className="bg-bg-card3 p-8 rounded-[40px] text-center shadow-sm border border-black/5 hover:-translate-y-2 transition-transform">
          <div className="text-6xl font-display font-black text-text-main mb-2">{profile.stats?.losses || 0}</div>
          <div className="text-text-main uppercase tracking-widest text-sm font-bold bg-white/50 px-4 py-2 rounded-full inline-block">Losses</div>
        </div>
        <div className="bg-bg-card2 p-8 rounded-[40px] text-center shadow-sm border border-black/5 hover:-translate-y-2 transition-transform">
          <div className="text-6xl font-display font-black text-text-main mb-2">{profile.stats?.winStreak || 0}</div>
          <div className="text-text-main uppercase tracking-widest text-sm font-bold bg-white/50 px-4 py-2 rounded-full inline-block">Streak</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
