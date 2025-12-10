import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Briefcase, ShoppingBag, MessageCircle, User } from 'lucide-react';
import { TabName } from '../types';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Simple mapping to check active path
  const isActive = (path: string) => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: TabName.EXPLORE, icon: Compass, path: '/' },
    { name: TabName.JOBS, icon: Briefcase, path: '/jobs' },
    { name: TabName.MARKET, icon: ShoppingBag, path: '/market' },
    { name: TabName.INBOX, icon: MessageCircle, path: '/inbox' },
    { name: TabName.PROFILE, icon: User, path: '/profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mx-auto max-w-screen-md shadow-2xl overflow-hidden relative">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-100 pb-safe">
        <div className="max-w-screen-md mx-auto flex items-center justify-between px-2 sm:px-6 py-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-1 group relative"
              >
                <div className={`
                    p-1.5 rounded-xl transition-all duration-300
                    ${active ? 'bg-indigo-50' : 'bg-transparent group-hover:bg-gray-50'}
                `}>
                    <item.icon 
                      size={24} 
                      strokeWidth={active ? 2.5 : 2}
                      className={`
                        transition-colors duration-300
                        ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}
                      `}
                    />
                </div>
                <span className={`
                    text-[10px] font-medium transition-colors duration-300
                    ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}
                `}>
                  {item.name}
                </span>
                
                {/* Active Indicator Dot */}
                {active && (
                    <span className="absolute top-1 right-1/4 w-1 h-1 bg-indigo-600 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Safe area spacer for mobile styling */}
      <div className="h-safe-bottom bg-white" />
    </div>
  );
};

export default Layout;