import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, ShoppingBag, Tags, LogOut, Command, Search, Bell, Store, Users, FileText } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Stores', path: '/admin/stores', icon: Store },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Leads', path: '/admin/leads', icon: FileText },
    { name: 'Users', path: '/admin/users', icon: Users },
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
            <span className="text-lg font-bold text-text-main tracking-tight">Pi-Admin</span>
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
          <button onClick={handleLogout} className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-bg-hover text-text-muted hover:text-text-main transition-all group">
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
            <span className="text-lg font-bold text-text-main tracking-tight">Pi-Admin</span>
          </div>
          
          <div className="hidden md:flex items-center text-sm font-medium text-text-muted">
            {navItems.find(i => i.path === location.pathname)?.name || 'Admin'}
          </div>

          <div className="flex items-center gap-4 relative" ref={navRef}>
            <ThemeToggle />
            
            {/* Bell/Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="relative p-2 text-text-muted hover:text-text-main transition-colors rounded-lg hover:bg-bg-hover"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-text-main rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 p-0 z-50 animate-in fade-in slide-in-from-top-2 bg-bg-card border border-border-subtle rounded-xl shadow-lg">
                  <div className="p-4 border-b border-border-subtle">
                    <h3 className="font-medium text-text-main text-sm">Notifications</h3>
                  </div>
                  <div className="p-6 text-center text-sm font-medium text-text-muted">
                    No new notifications
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="h-8 w-8 rounded-full bg-bg-surface border border-border-subtle overflow-hidden flex items-center justify-center font-bold text-text-main text-xs uppercase cursor-pointer hover:bg-bg-hover transition-all"
              >
                A
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 p-0 z-50 animate-in fade-in slide-in-from-top-2 bg-bg-card border border-border-subtle rounded-xl shadow-lg">
                  <div className="p-4 border-b border-border-subtle">
                    <p className="text-sm font-semibold text-text-main truncate">Admin Account</p>
                    <p className="text-xs font-medium text-text-muted truncate mt-0.5">admin session</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-hover text-text-main transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 w-full max-w-6xl mx-auto p-6 lg:p-10 pt-2 lg:pt-4">
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
      </div>
    </div>
  );
}
