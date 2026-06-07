import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Lead, CrmNote, CatalogProduct } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Phone, Mail, FileText, Send, MoreHorizontal, DollarSign, X } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/utils';
import { format } from 'date-fns';

export default function CRM() {
  const { userProfile, currentUser } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Record<string, CatalogProduct>>({});
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<CrmNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittingNote, setSubmittingNote] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!userProfile?.storeId) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'leads'), where('storeId', '==', userProfile.storeId));
        const snapshot = await getDocs(q);
        setLeads(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
        
        // Only fetch products specifically referenced by the fetched leads
        const pMap: Record<string, CatalogProduct> = {};
        const pIds = Array.from(new Set(snapshot.docs.map(d => d.data().productId).filter(Boolean)));
        
        if (pIds.length > 0) {
          const productPromises = pIds.map(pid => getDoc(doc(db, 'products', pid)));
          const productSnaps = await Promise.all(productPromises);
          productSnaps.forEach(snap => {
            if (snap.exists()) {
              pMap[snap.id] = { id: snap.id, ...snap.data() } as CatalogProduct;
            }
          });
        }
        
        setProducts(pMap);

      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'leads');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [userProfile]);

  useEffect(() => {
    if (!selectedLead) return;
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, 'crmNotes'), where('leadId', '==', selectedLead.id), where('createdBy', '==', currentUser?.uid));
        const snapshot = await getDocs(q);
        const nList = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CrmNote));
        nList.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setNotes(nList);
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'crmNotes');
      }
    };
    fetchNotes();
  }, [selectedLead]);

  const updateStatus = async (leadId: string, status: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), { status });
      if (selectedLead?.id === leadId) setSelectedLead({ ...selectedLead, status });
      setLeads(leads.map(l => l.id === leadId ? { ...l, status } : l));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${leadId}`);
    }
  };

  const updateSalesValue = async (val: string) => {
    if (!selectedLead) return;
    const num = parseFloat(val) || 0;
    try {
      await updateDoc(doc(db, 'leads', selectedLead.id), { salesValue: num });
      setSelectedLead({ ...selectedLead, salesValue: num });
      setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, salesValue: num } : l));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leads/${selectedLead.id}`);
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead || !currentUser) return;
    setSubmittingNote(true);
    try {
      const noteData = {
        leadId: selectedLead.id,
        note: newNote.trim(),
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'crmNotes'), noteData);
      setNotes([...notes, { id: docRef.id, ...noteData }]);
      setNewNote('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'crmNotes');
    } finally {
      setSubmittingNote(false);
    }
  };

  if (!userProfile?.storeId) return (
    <div className="neo-card border border-dashed border-border-subtle flex flex-col items-center justify-center p-12 text-center mt-8 bg-bg-surface shadow-sm">
       <h3 className="text-xl font-bold mb-2 text-text-main">Configure Your Store</h3>
       <p className="text-text-muted font-medium">You must create a store first before managing leads.</p>
    </div>
  );
  if (loading) return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {[1,2,3].map(i => <div key={i} className="neo-card h-[250px] animate-pulse bg-bg-card shadow-sm"></div>)}
     </div>
  );

  const statusColors = {
    new: 'text-text-main bg-text-main/10 ring-1 ring-text-main/20',
    contacted: 'text-[#F5A524] bg-[#F5A524]/10 ring-1 ring-[#F5A524]/20',
    interested: 'text-primary bg-primary/10 ring-1 ring-primary/20',
    won: 'text-primary bg-primary/10 ring-1 ring-primary/20',
    lost: 'text-text-muted bg-bg-hover ring-1 ring-border-strong',
  };

  const uncontactedLeads = leads.filter(l => l.status === 'new');
  const estimatedLostValue = uncontactedLeads.reduce((acc, lead) => acc + (lead.salesValue || 0), 0);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8 mt-4">
        <div>
          <h1 className="heading-display text-4xl text-text-main mb-2">Customer Relations</h1>
          <p className="text-text-muted text-base max-w-3xl text-balance">Manage incoming inquiries, track deals, and maintain history for all store leads.</p>
        </div>
      </div>

      {uncontactedLeads.length > 0 && (
        <div className="mb-8 p-6 rounded-2xl bg-alert/5 border border-alert/20 flex flex-col sm:flex-row items-center gap-6 shadow-[0_0_15px_rgba(255,49,49,0.05)]">
          <div className="w-14 h-14 rounded-full bg-alert/20 flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7 text-alert" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl heading-display text-text-main mb-1">
              You're leaving <span className="text-alert font-bold">${estimatedLostValue.toFixed(2)}</span> on the table.
            </h3>
            <p className="text-text-muted text-sm font-medium">
              You have <span className="text-alert font-bold">{uncontactedLeads.length} uncontacted {uncontactedLeads.length === 1 ? 'lead' : 'leads'}</span> waiting for a response. They might lose interest.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-16">
        {leads.length === 0 ? (
           <div className="col-span-full neo-card border border-dashed border-border-subtle flex flex-col items-center justify-center p-16 text-center mt-8 bg-transparent shadow-none">
             <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-text-muted opacity-50" />
             </div>
             <h3 className="text-xl font-bold text-text-main mb-3">No Leads Yet</h3>
             <p className="text-text-muted text-base font-medium max-w-md">When customers submit inquiries on your storefront, they will strategically appear here.</p>
          </div>
        ) : leads.map(lead => (
          <div key={lead.id} className="neo-card p-6 flex flex-col group bg-bg-card border-border-subtle hover:border-border-strong hover:shadow-lg transition-all focus-within:border-accent">
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-lg uppercase">{lead.name ? lead.name.charAt(0) : '?'}</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg text-text-main tracking-tight">{lead.name || 'Anonymous'}</h3>
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mt-1 ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedLead(lead)}
                  className="w-10 h-10 rounded-xl bg-bg-hover flex items-center justify-center text-text-muted transition-colors hover:bg-text-main hover:text-white"
                >
                   <MoreHorizontal className="w-5 h-5" />
                </button>
             </div>

             <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center justify-between text-sm">
                   <span className="shrink-0 font-medium text-text-muted">Product</span>
                   <span className="text-text-main font-semibold truncate max-w-[200px] text-right">{lead.productId && products[lead.productId] ? products[lead.productId].title : 'General Inquiry'}</span>
                </div>
                {lead.email && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="shrink-0 font-medium text-text-muted">Email</span>
                    <a href={`mailto:${lead.email}`} className="text-text-main font-semibold hover:text-accent truncate transition-colors max-w-[200px] text-right">{lead.email}</a>
                  </div>
                )}
                {lead.phone && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="shrink-0 font-medium text-text-muted">Phone</span>
                    <a href={`tel:${lead.phone}`} className="text-text-main font-semibold hover:text-accent truncate transition-colors max-w-[200px] text-right">{lead.phone}</a>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                   <span className="shrink-0 font-medium text-text-muted">Value</span>
                   <span className="text-success font-bold text-lg tracking-tight">${lead.salesValue?.toFixed(2) || '0.00'}</span>
                </div>
             </div>

             <div className="flex gap-3 mt-auto pt-4 border-t border-border-subtle">
               <label htmlFor={`status-${lead.id}`} className="sr-only">Status</label>
               <select 
                  id={`status-${lead.id}`}
                  value={lead.status} 
                  onChange={e => updateStatus(lead.id, e.target.value as any)}
                  className="neo-input flex-1 px-4 py-2 text-sm bg-bg-surface font-medium border-border-subtle"
               >
                  <option value="new">Move to New</option>
                  <option value="contacted">Mark Contacted</option>
                  <option value="interested">Mark Interested</option>
                  <option value="won">Close as Won</option>
                  <option value="lost">Close as Lost</option>
               </select>
               <button 
                 onClick={() => setSelectedLead(lead)}
                 className="px-4 py-2 rounded-lg bg-text-main text-bg-base font-semibold text-sm hover:bg-text-main/90 transition-colors"
               >
                 View
               </button>
             </div>
          </div>
        ))}
      </div>

      {/* Detail Slide-over / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedLead(null)}></div>
           <div className="w-full max-w-[500px] h-full bg-bg-card border-l border-border-subtle shadow-lg relative z-10 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="h-16 shrink-0 border-b border-border-subtle flex items-center justify-between px-6 bg-bg-base">
                 <h2 className="text-lg font-bold text-text-main tracking-tight">Lead Details</h2>
                 <button onClick={() => setSelectedLead(null)} className="p-2 -mr-2 text-text-muted hover:text-text-main rounded-xl hover:bg-bg-hover transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                 {/* Lead Info */}
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight text-text-main mb-3">{selectedLead.name || 'Anonymous'}</h1>
                    <div className="flex flex-wrap gap-3 items-center mb-2">
                       <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColors[selectedLead.status]}`}>
                         {selectedLead.status}
                       </span>
                       <span className="text-sm font-semibold text-text-muted">{selectedLead.productId && products[selectedLead.productId] ? products[selectedLead.productId].title : 'General Inquiry'}</span>
                    </div>
                    {selectedLead.email && <div className="text-sm text-text-muted font-medium">{selectedLead.email}</div>}
                    {selectedLead.phone && <div className="text-sm text-text-muted font-medium mt-1">{selectedLead.phone}</div>}
                 </div>

                 {/* Editable Value */}
                 <div className="py-4 border-y border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                          <DollarSign className="w-4 h-4 text-success" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-text-main tracking-tight">Deal Value</p>
                          <p className="text-xs font-medium text-text-muted mt-0.5">Expected Revenue</p>
                       </div>
                    </div>
                    <div className="flex items-center bg-bg-surface border border-border-subtle rounded-lg px-3 overflow-hidden focus-within:border-accent transition-colors w-full sm:w-auto">
                       <label htmlFor="lead-deal-value" className="sr-only">Deal Value</label>
                       <span className="text-text-muted font-semibold text-sm">$</span>
                       <input 
                         id="lead-deal-value"
                         type="number"
                         value={selectedLead.salesValue || ''}
                         onChange={e => updateSalesValue(e.target.value)}
                         placeholder="0.00"
                         className="w-full sm:w-28 bg-transparent border-none py-2 px-2 text-text-main font-semibold text-sm outline-none"
                       />
                    </div>
                 </div>

                 {/* Initial Message */}
                 {selectedLead.notes && (
                   <div className="space-y-2">
                      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Initial Message</h3>
                      <div className="bg-bg-surface border border-border-subtle p-4 rounded-xl text-sm font-medium text-text-secondary leading-relaxed whitespace-pre-wrap">
                         {selectedLead.notes}
                      </div>
                   </div>
                 )}

                 {/* Activity Timeline */}
                 <div className="flex-1 mb-6">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Activity Timeline</h3>
                    <div className="space-y-4">
                       {notes.length === 0 ? (
                          <div className="text-sm font-medium text-text-muted text-center py-6">No internal notes added yet.</div>
                       ) : notes.map(note => (
                          <div key={note.id} className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-bg-hover flex items-center justify-center shrink-0 mt-0.5">
                                <MessageSquare className="w-4 h-4 text-text-muted" />
                             </div>
                             <div className="flex-1 bg-bg-base border border-border-subtle rounded-xl p-4">
                                <div className="flex justify-between items-center mb-1.5">
                                   <span className="text-sm font-bold text-text-main tracking-tight">Internal Note</span>
                                   <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{format(new Date(note.createdAt), 'MMM d, h:mm a')}</span>
                                </div>
                                <p className="text-sm font-medium text-text-secondary leading-relaxed whitespace-pre-wrap">{note.note}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Note Input */}
              <div className="p-6 border-t border-border-subtle bg-bg-base shrink-0">
                 <form onSubmit={handleAddNote} className="flex gap-3">
                    <label htmlFor="new-note" className="sr-only">New Note</label>
                    <input 
                      id="new-note"
                      type="text"
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      disabled={submittingNote}
                      placeholder="Type a new internal note..."
                      className="neo-input flex-1 h-12 text-sm"
                    />
                    <button 
                      type="submit" 
                      disabled={!newNote.trim() || submittingNote}
                      className="neo-button h-12 px-6 bg-accent text-white font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       {submittingNote ? '...' : <Send className="w-4 h-4" />}
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
