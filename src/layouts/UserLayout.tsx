import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LayoutDashboard, Store, Users, LogOut, ExternalLink, Menu, X, Bell, Search, Command, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAuth();
  const [storeSlug, setStoreSlug] = useState<string | null>(null);

  useEffect(() => {
    const loadSlug = async () => {
      if (userProfile?.storeId) {
        try {
          const sDoc = await getDoc(doc(db, 'stores', userProfile.storeId));
          if (sDoc.exists()) {
            setStoreSlug(sDoc.data().slug);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadSlug();
  }, [userProfile?.storeId]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Catalog', path: '/app/catalog', icon: Search },
    { name: 'My Store', path: '/app/store', icon: Store },
    { name: 'Wallet', path: '/app/wallet', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col md:flex-row text-text-main font-sans selection:bg-accent selection:text-text-inverted">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[240px] bg-bg-card/40 backdrop-blur-2xl border-r border-border-subtle flex-col min-h-screen sticky top-0 z-20">
        <div className="h-16 flex items-center px-6 shrink-0 mt-2">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-text-main flex items-center justify-center text-bg-base group-hover:scale-105 transition-transform">
              <Command className="w-4 h-4 text-bg-base" />
            </div>
            <span className="text-lg font-bold text-text-main tracking-tight">Pi-Store</span>
          </div>
        </div>
        
        <div className="px-4 py-4 shrink-0">
          <div className="relative group">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-text-main transition-colors z-10" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-bg-surface border border-transparent focus:border-border-strong focus:bg-bg-card rounded-md pl-9 pr-4 py-2 text-sm outline-none transition-all placeholder-text-muted"
            />
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  isActive 
                    ? 'bg-bg-surface text-text-main shadow-sm border border-border-subtle'
                    : 'text-text-muted hover:bg-bg-hover hover:text-text-main border border-transparent'
                }`}
              >
                <Icon className={`mr-3 h-4 w-4 ${isActive ? 'text-text-main' : 'text-text-muted'}`} /> 
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 space-y-1 shrink-0 mb-2">
          {storeSlug && (
            <Link to={`/s/${storeSlug}`} target="_blank" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:bg-bg-hover hover:text-text-main transition-all">
              <ExternalLink className="mr-3 h-4 w-4" /> View Store
            </Link>
          )}
          <button onClick={handleLogout} className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:text-text-main hover:bg-bg-hover transition-all group">
            <LogOut className="mr-3 h-4 w-4 transition-colors" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-0 pb-[72px] md:pb-0">
        
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 lg:px-10 shrink-0 mt-2">
          <div className="flex items-center md:hidden gap-3">
             <div className="w-8 h-8 rounded-lg bg-text-main flex items-center justify-center text-bg-base">
              <Command className="w-4 h-4 text-bg-base" />
            </div>
            <span className="text-lg font-bold text-text-main tracking-tight">Pi-Store</span>
          </div>
          
          <div className="hidden md:flex items-center text-sm font-medium text-text-muted">
            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center font-bold text-text-main text-xs uppercase cursor-pointer hover:bg-bg-hover transition-all">
              {userProfile?.name ? userProfile.name.charAt(0) : 'U'}
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 w-full max-w-5xl mx-auto p-6 lg:p-10 pt-2 lg:pt-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg-card/60 backdrop-blur-2xl border-t border-border-subtle z-50 px-6 flex items-center justify-between pb-safe">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] h-full transition-all ${
                isActive ? 'text-text-main scale-105' : 'text-text-muted'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors`}>
                <Icon className="h-5 w-5" />
              </div>
            </Link>
          );
        })}
        {storeSlug && (
           <Link to={`/s/${storeSlug}`} target="_blank" className="flex flex-col items-center justify-center gap-1 min-w-[64px] h-full text-text-muted">
             <div className="p-1.5 rounded-lg bg-transparent">
               <ExternalLink className="h-5 w-5" />
             </div>
           </Link>
        )}
      </div>
    </div>
  );
}
