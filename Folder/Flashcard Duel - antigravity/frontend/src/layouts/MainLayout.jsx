import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-success/10 blur-[120px] -z-10 pointer-events-none" />

      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 z-10 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
