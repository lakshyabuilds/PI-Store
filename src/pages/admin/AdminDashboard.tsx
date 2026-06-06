import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { ShoppingBag, Store as StoreIcon, Users, FileText, ArrowUpRight } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/utils';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, stores: 0, users: 0, leads: 0 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pSnap, sSnap, uSnap, lSnap] = await Promise.all([
          getDocs(query(collection(db, 'products'))),
          getDocs(query(collection(db, 'stores'))),
          getDocs(query(collection(db, 'users'))),
          getDocs(query(collection(db, 'leads')))
        ]);
        setStats({
          products: pSnap.size,
          stores: sSnap.size,
          users: uSnap.size,
          leads: lSnap.size
        });
        
        const recentUsersList = uSnap.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 5);
        setRecentUsers(recentUsersList);
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'admin stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col space-y-6">
       <div className="h-10 w-48 bg-bg-card rounded-lg animate-pulse"></div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[1,2,3,4].map(i => <div key={i} className="neo-card h-[160px] animate-pulse bg-bg-card"></div>)}
       </div>
    </div>
  );

  const statCards = [
    { name: 'Active Stores', icon: StoreIcon, value: stats.stores, color: 'text-bg-base', bg: 'bg-text-main', path: '/admin/stores' },
    { name: 'Global Products', icon: ShoppingBag, value: stats.products, color: 'text-[#17C964]', bg: 'bg-[#17C964]/10', path: '/admin/products' },
    { name: 'Registered Users', icon: Users, value: stats.users, color: 'text-[#F5A524]', bg: 'bg-[#F5A524]/10', path: '/admin/users' },
    { name: 'Total Leads', icon: FileText, value: stats.leads, color: 'text-[#9353D3]', bg: 'bg-[#9353D3]/10', path: '/admin/leads' },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-text-main">Platform Overview</h1>
          <p className="text-text-muted text-base max-w-3xl text-balance">Monitor holistic platform metrics, handle global catalog updates, and manage creator accounts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {statCards.map((s, i) => (
          <Link to={s.path} key={i} className="neo-card p-5 flex flex-col justify-between group hover:border-border-strong bg-bg-surface border-transparent relative overflow-hidden transition-colors">
            <div className="flex justify-between items-start mb-6">
               <div className={`p-2 rounded-lg bg-bg-card border border-border-subtle`}>
                 <s.icon className={`h-5 w-5 text-text-main`} />
               </div>
               <div className="w-8 h-8 flex items-center justify-center text-text-muted group-hover:text-text-main transition-colors">
                  <ArrowUpRight className="w-4 h-4 font-medium" />
               </div>
            </div>
            <div>
               <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">{s.name}</p>
               <p className="text-3xl font-bold tracking-tight text-text-main">{s.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="neo-card p-6 flex-1 flex flex-col bg-bg-card border-border-subtle shadow-sm">
         <h3 className="text-lg font-semibold mb-6 text-text-main">Recent Users</h3>
         {recentUsers.length === 0 ? (
            <p className="text-text-muted text-sm border border-dashed border-border-subtle p-8 text-center rounded-xl bg-transparent">No users found.</p>
         ) : (
            <div className="space-y-2">
              {recentUsers.map(u => (
                <div key={u.id} className="flex justify-between items-center bg-bg-surface p-4 rounded-lg border border-transparent hover:border-border-subtle transition-colors">
                  <div>
                    <p className="font-medium text-text-main text-sm">{u.name || 'Anonymous'}</p>
                    <p className="text-xs text-text-muted mt-0.5">{u.email}</p>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 bg-bg-card border border-border-subtle rounded text-text-muted">{u.role}</span>
                </div>
              ))}
            </div>
         )}
      </div>
    </div>
  );
}
