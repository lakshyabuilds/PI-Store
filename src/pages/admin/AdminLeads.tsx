import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FileText } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/utils';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'leads')));
        setLeads(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'leads');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
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
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-text-main">Total Leads</h1>
          <p className="text-text-muted text-base md:text-lg font-medium max-w-3xl text-balance">View captured leads across all creator stores.</p>
        </div>
      </div>

      <div className="neo-card overflow-hidden flex-1 flex flex-col p-0 bg-bg-card border-border-subtle shadow-sm">
        {leads.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
             <div className="w-16 h-16 bg-bg-hover rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-text-muted opacity-50" />
             </div>
            <h3 className="text-xl font-bold mb-2 text-text-main">No Leads Found</h3>
            <p className="text-text-muted font-medium text-base">There are currently no captured leads on the platform.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-surface">
                  <th className="p-4 pl-6 text-xs font-semibold uppercase tracking-wider text-text-muted">Email</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Store ID</th>
                  <th className="p-4 pr-6 text-xs font-semibold uppercase tracking-wider text-text-muted">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-bg-hover/50 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-text-main">{lead.email}</td>
                    <td className="p-4 text-text-muted font-medium font-mono text-sm tracking-tight">{lead.storeId}</td>
                    <td className="p-4 pr-6 text-sm font-medium text-text-secondary">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
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
