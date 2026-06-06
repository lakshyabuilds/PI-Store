import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Store } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-transparent text-text-main font-sans selection:bg-text-main selection:text-bg-base flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-card/60 backdrop-blur-md border-b border-border-subtle transition-all">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded bg-text-main flex items-center justify-center text-bg-base transition-transform group-hover:scale-105">
              <Store className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-bold tracking-tight text-text-main">BioHere</span>
          </Link>
          <div className="hidden md:flex gap-6 items-center text-sm font-medium text-text-muted">
            <Link to="/pricing" className="hover:text-text-main transition-colors">Pricing</Link>
            <Link to="/use-cases" className="hover:text-text-main transition-colors">Use Cases</Link>
            <Link to="/about" className="hover:text-text-main transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors hidden sm:block">
              Log In
            </Link>
            <Link to="/register" className="neo-button px-4 py-1.5 bg-text-main text-bg-base text-sm hover:opacity-90">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-14">
        <Outlet />
      </main>

      <footer className="border-t border-border-subtle py-12 px-6 bg-transparent mt-auto backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
             <Link to="/" className="flex items-center gap-2 mb-3">
               <div className="w-5 h-5 rounded bg-text-main flex items-center justify-center text-bg-base">
                 <Store className="w-3 h-3" />
               </div>
               <span className="text-sm font-bold tracking-tight text-text-main">BioHere</span>
             </Link>
             <p className="text-text-muted text-xs leading-relaxed">
               Your link-in-bio and digital storefront. Made for real creators.
             </p>
          </div>
          <div className="flex gap-12 text-sm text-text-muted">
             <div className="flex flex-col gap-2">
                <Link to="/use-cases" className="hover:text-text-main transition-colors">Use Cases</Link>
                <Link to="/pricing" className="hover:text-text-main transition-colors">Pricing</Link>
                <Link to="/comparisons" className="hover:text-text-main transition-colors">Alternatives</Link>
             </div>
             <div className="flex flex-col gap-2">
                <Link to="/about" className="hover:text-text-main transition-colors">About</Link>
                <Link to="/contact" className="hover:text-text-main transition-colors">Contact</Link>
                <Link to="/faq" className="hover:text-text-main transition-colors">FAQ</Link>
             </div>
             <div className="flex flex-col gap-2">
                <Link to="/terms" className="hover:text-text-main transition-colors">Terms of Service</Link>
                <Link to="/privacy-policy" className="hover:text-text-main transition-colors">Privacy Policy</Link>
             </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-border-subtle flex items-center justify-between gap-6 text-xs text-text-muted">
           <span>© {new Date().getFullYear()} BioHere. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
