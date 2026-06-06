import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Users } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/utils';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'users')));
        setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
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
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-text-main">Registered Users</h1>
          <p className="text-text-muted text-base md:text-lg font-medium max-w-3xl text-balance">Manage platform users, including creators and admins.</p>
        </div>
      </div>

      <div className="neo-card overflow-hidden flex-1 flex flex-col p-0 bg-bg-card border-border-subtle shadow-sm">
        {users.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
             <div className="w-16 h-16 bg-bg-hover rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-text-muted opacity-50" />
             </div>
            <h3 className="text-xl font-bold mb-2 text-text-main">No Users Found</h3>
            <p className="text-text-muted font-medium text-base">There are currently no registered users.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-surface">
                  <th className="p-4 pl-6 text-xs font-semibold uppercase tracking-wider text-text-muted">Name</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Email</th>
                  <th className="p-4 pr-6 text-xs font-semibold uppercase tracking-wider text-text-muted">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-bg-hover/50 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-text-main">{user.name || 'Anonymous'}</td>
                    <td className="p-4 text-text-muted font-medium">{user.email}</td>
                    <td className="p-4 pr-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border border-border-subtle rounded text-text-secondary bg-bg-surface">
                        {user.role || 'user'}
                      </span>
                    </td>
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
