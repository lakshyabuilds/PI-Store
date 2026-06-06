import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Store } from '../../types';
import { TrendingUp, Activity, ExternalLink, Zap, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function UserDashboard() {
  const { userProfile } = useAuth();
  const hasStore = !!userProfile?.storeId;

  // Static mock data for dopamine
  const stats = {
    todayRevenue: 0.00,
    totalSales: 0,
    storeViews: 0,
    conversionRate: 0
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pb-16">
      
      {/* Dopamine Header */}
      <div className="mb-10 flex flex-col items-center text-center mt-8">
         <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6"
         >
           <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Tracker
         </motion.div>
         <h1 className="text-sm font-bold text-text-muted tracking-[0.2em] uppercase mb-4">Today's Revenue</h1>
         
         <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="text-8xl md:text-[8rem] font-black tracking-tighter text-text-main tabular-nums leading-none mb-6 drop-shadow-sm"
         >
           $0.00
         </motion.div>
         
         <p className="text-text-muted font-medium text-lg max-w-md mx-auto">
           {hasStore ? 
             "Your store is live. Share your link everywhere and watch this number grow." :
             "Set up your store and add products to get your first sale."}
         </p>
      </div>

      {/* Primary Setup Call to Action (if store is not built) */}
      {!hasStore && (
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 max-w-2xl mx-auto w-full neo-card p-1 bg-gradient-to-r from-primary to-accent rounded-3xl"
        >
          <div className="bg-bg-card p-8 rounded-[1.4rem] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">Your Store is Inactive</h3>
              <p className="text-text-muted text-sm font-medium">You need to set up your 1-click storefront and add products to start earning.</p>
            </div>
            <Link to="/app/store" className="shrink-0 bg-text-main text-bg-base font-bold px-8 py-4 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shadow-xl">
              <Zap className="w-5 h-5 text-primary" /> Setup Store Now
            </Link>
          </div>
        </motion.div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <MetricCard 
           delay={0.1}
           title="Total Orders" 
           value={stats.totalSales.toString()} 
           icon={<ShoppingBag className="w-5 h-5" />} 
           trend="+0%" 
        />
        <MetricCard 
           delay={0.2}
           title="Store Views" 
           value={stats.storeViews.toString()} 
           icon={<Users className="w-5 h-5" />} 
           trend="0 this week" 
        />
        <MetricCard 
           delay={0.3}
           title="Conversion Rate" 
           value={`${stats.conversionRate}%`} 
           icon={<Activity className="w-5 h-5" />} 
           trend="Optimized" 
        />
        <MetricCard 
           delay={0.4}
           title="Available Balance" 
           value={`$${stats.todayRevenue.toFixed(2)}`} 
           icon={<DollarSign className="w-5 h-5" />} 
           trend="Ready for payout" 
           isPrimary
        />

      </div>

      {/* Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="neo-card bg-bg-card rounded-3xl overflow-hidden ring-1 ring-border-subtle"
      >
        <div className="p-6 md:p-8 border-b border-border-subtle flex items-center justify-between">
           <h3 className="text-xl font-bold tracking-tight text-text-main flex items-center gap-3">
             <Activity className="w-6 h-6 text-primary" /> Live Feed
           </h3>
           <div className="text-xs font-bold uppercase tracking-wider text-text-muted px-3 py-1 bg-bg-surface rounded-full">
             Real-time
           </div>
        </div>
        
        <div className="p-12 flex flex-col items-center justify-center text-center">
           <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-6 relative z-10 border border-border-strong">
                 <Zap className="w-6 h-6 text-primary" />
              </div>
           </div>
           <h4 className="text-2xl font-bold text-text-main tracking-tight mb-2">Waiting for action...</h4>
           <p className="text-base font-medium text-text-muted max-w-md mx-auto leading-relaxed">
             This is where your dopamine hits visually happen. Every sale, every visit, every big win will appear right here. Share your store link everywhere.
           </p>

           {hasStore && (
             <Link to="/app/store" className="mt-8 text-primary font-bold hover:underline flex items-center gap-1.5 hover:gap-2 transition-all">
                Get your Store Link <ExternalLink className="w-4 h-4" />
             </Link>
           )}
        </div>
      </motion.div>

    </div>
  );
}

function MetricCard({ title, value, icon, trend, isPrimary, delay = 0 }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-6 rounded-3xl ${isPrimary ? 'bg-text-main text-bg-base' : 'bg-bg-card ring-1 ring-border-subtle text-text-main'}`}
    >
       <div className="flex items-center justify-between mb-4">
         <span className={`text-sm font-bold tracking-wider uppercase ${isPrimary ? 'text-bg-base/70' : 'text-text-muted'}`}>{title}</span>
         <div className={`p-2 rounded-xl ${isPrimary ? 'bg-bg-base/10 text-primary' : 'bg-bg-surface text-text-muted'}`}>
           {icon}
         </div>
       </div>
       <div className={`text-4xl font-black tracking-tighter mb-2 ${isPrimary ? 'text-bg-base' : 'text-text-main'}`}>
         {value}
       </div>
       <div className={`text-xs font-bold ${isPrimary ? 'text-bg-base/70' : 'text-primary'}`}>
         {trend}
       </div>
    </motion.div>
  );
}
