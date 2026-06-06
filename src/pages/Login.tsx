import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithGoogle } from '../firebase';
import { Store, ArrowRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Login({ isRegister = false }: { isRegister?: boolean }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-text-main flex flex-col font-sans selection:bg-accent/30 selection:text-text-main relative">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative z-10">
         <div className="w-full max-w-[400px] neo-card p-8 md:p-10 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center mb-8 text-center">
             <Link to="/" className="w-12 h-12 bg-text-main rounded flex items-center justify-center text-bg-base hover:scale-105 transition-transform duration-300 mx-auto">
               <Store className="h-6 w-6" />
             </Link>
          </div>

          <div className="text-center mb-8">
             <h2 className="text-2xl font-bold text-text-main tracking-tight mb-2">
               {isRegister ? 'Start Selling' : 'Welcome Back'}
             </h2>
             <p className="text-text-muted text-sm px-2">
               {isRegister ? 'Create your platform account and launch your store.' : 'Sign in to manage your branded digital product store and CRM.'}
             </p>
          </div>

          {error && (
             <div className="bg-error/10 border border-error/20 p-3 rounded-lg mb-6 animate-in slide-in-from-top-2">
               <p className="text-sm text-error text-center">{error}</p>
             </div>
          )}

          <button
             onClick={handleLogin}
             disabled={loading}
             className="neo-button w-full h-12 bg-text-main text-bg-base text-sm disabled:opacity-50 disabled:cursor-not-allowed group hover:opacity-90 flex items-center justify-center"
          >
             {loading ? 'Authenticating...' : (
               <>
                 Continue with Google
                 <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
               </>
             )}
          </button>

          <div className="mt-8 pt-6 border-t border-border-subtle text-center flex flex-col gap-4">
             <p className="text-xs text-text-muted">
                By continuing, you agree to our <Link to="/privacy-policy" className="text-text-main hover:underline">Privacy Policy</Link>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
