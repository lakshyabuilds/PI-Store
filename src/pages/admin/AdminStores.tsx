import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Store as StoreIcon } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/utils';

export default function AdminStores() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'stores')));
        setStores(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'stores');
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  if (loading) return (
     <div className="flex flex-col space-y-4 mt-10">
        {[1,2,3,4].map(i => <div key={i} className="neo-card h-[72px] animate-pulse bg-bg-card"></div>)}
     </div>
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-text-main">Active Stores</h1>
          <p className="text-text-muted text-base md:text-lg font-medium max-w-3xl text-balance">View all stores created by users on the platform.</p>
        </div>
      </div>

      <div className="neo-card overflow-hidden flex-1 flex flex-col p-0 bg-bg-card border-border-subtle shadow-sm">
        {stores.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
             <div className="w-16 h-16 bg-bg-hover rounded-2xl flex items-center justify-center mb-6">
                <StoreIcon className="w-8 h-8 text-text-muted opacity-50" />
             </div>
            <h3 className="text-xl font-bold mb-2 text-text-main">No Stores Found</h3>
            <p className="text-text-muted font-medium text-base">There are currently no active stores on the platform.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-surface">
                  <th className="p-4 pl-6 text-xs font-semibold uppercase tracking-wider text-text-muted">Store Name</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Slug</th>
                  <th className="p-4 pr-6 text-xs font-semibold uppercase tracking-wider text-text-muted">Owner ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {stores.map(store => (
                  <tr key={store.id} className="hover:bg-bg-hover/50 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-text-main">{store.name || 'Unnamed Store'}</td>
                    <td className="p-4 text-text-muted font-medium">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border border-border-subtle rounded text-text-secondary bg-bg-surface">{store.slug || 'N/A'}</span>
                    </td>
                    <td className="p-4 pr-6 text-sm text-text-muted font-mono">{store.userId || store.ownerId || 'Unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
