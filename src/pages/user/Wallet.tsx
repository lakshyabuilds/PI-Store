import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Wallet as WalletIcon, ArrowUpRight, History, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Wallet() {
  const { userProfile } = useAuth();
  
  // High dopamine fake payout data to motivate user
  const balance = 0.00;
  const nextPayoutDate = new Date();
  nextPayoutDate.setDate(nextPayoutDate.getDate() + 7);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16">
      
      <div className="mb-8">
         <h2 className="text-4xl font-black text-text-main tracking-tight mb-2">Wallet & Payouts</h2>
         <p className="text-text-muted text-lg font-medium">Connect your preferred payout method.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         {/* Balance Card */}
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="neo-card bg-bg-card p-8 rounded-3xl relative overflow-hidden ring-1 ring-border-subtle"
         >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <WalletIcon className="w-32 h-32" />
            </div>
            
            <span className="text-sm font-bold tracking-widest text-text-muted uppercase mb-4 block">Available Balance</span>
            <div className="text-6xl font-black tracking-tighter text-text-main mb-6">
              ${balance.toFixed(2)}
            </div>
            
            <button className="w-full neo-button bg-text-main text-bg-base font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
               <ArrowUpRight className="w-5 h-5" /> Request Payout
            </button>
            <p className="text-center text-xs text-text-muted mt-3 font-medium">
               Minimum payout requires $50.00
            </p>
         </motion.div>

         {/* Payout Method */}
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="neo-card bg-bg-card p-8 rounded-3xl flex flex-col justify-between"
         >
            <div>
              <div className="w-12 h-12 bg-bg-surface rounded-xl flex items-center justify-center mb-6">
                 <Building2 className="w-6 h-6 text-text-main" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-text-main mb-2">Payout Method</h3>
              <p className="text-text-muted font-medium text-sm leading-relaxed mb-6">
                 Configure how you want to be paid. We process payouts every Friday automatically for balances over $50.
              </p>
            </div>
            
            <button className="w-full neo-button bg-bg-surface hover:bg-bg-hover text-text-main font-bold py-4 rounded-xl transition-colors border border-border-strong">
               Connect Bank / Stripe
            </button>
         </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="neo-card bg-bg-card rounded-3xl overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-border-subtle flex items-center justify-between">
           <h3 className="text-xl font-bold tracking-tight text-text-main flex items-center gap-2">
             <History className="w-5 h-5 text-text-muted" /> Payment History
           </h3>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-4 text-text-muted">
              <WalletIcon className="w-6 h-6" />
           </div>
           <h4 className="text-lg font-bold text-text-main mb-1">No transactions yet</h4>
           <p className="text-sm font-medium text-text-muted max-w-sm">
             Launch your store and share your links to get your first sales rolling in.
           </p>
        </div>
      </motion.div>
      
    </div>
  );
}
