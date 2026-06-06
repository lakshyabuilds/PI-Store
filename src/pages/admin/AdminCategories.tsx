import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Category } from '../../types';
import { Pencil, Trash2, Plus, X, FolderTree } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/utils';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });

  const loadCategories = async () => {
    try {
      const q = query(collection(db, 'categories'));
      const snapshot = await getDocs(q);
      setCategories(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Category)));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateDoc(doc(db, 'categories', isEditing), form);
      } else {
        await addDoc(collection(db, 'categories'), { ...form, createdAt: new Date().toISOString() });
      }
      setIsModalOpen(false);
      loadCategories();
    } catch (err) {
      handleFirestoreError(err, isEditing ? OperationType.UPDATE : OperationType.CREATE, 'categories');
    }
  };

  const handleEdit = (c: Category) => {
    setForm({ name: c.name, slug: c.slug || '', description: c.description || '' });
    setIsEditing(c.id!);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteDoc(doc(db, 'categories', deletingId));
      setDeletingId(null);
      loadCategories();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'categories');
    }
  };

  if (loading) return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {[1,2,3].map(i => <div key={i} className="neo-card h-[150px] animate-pulse bg-bg-card"></div>)}
     </div>
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-text-main">Categories</h1>
          <p className="text-text-muted text-base md:text-lg font-medium max-w-3xl text-balance">Organize global product schema into high-level categories.</p>
        </div>
        <button 
          onClick={() => { setForm({ name: '', slug: '', description: '' }); setIsEditing(null); setIsModalOpen(true); }} 
          className="neo-button px-6 py-3 bg-accent text-white font-semibold flex items-center shadow-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5 mr-2" /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map(c => (
          <div key={c.id} className="neo-card p-6 flex flex-col group hover:border-border-strong hover:shadow-lg transition-all bg-bg-card border-border-subtle">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl text-text-main mb-2 tracking-tight group-hover:text-accent transition-colors">{c.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted bg-bg-surface border border-border-subtle px-2 py-1 rounded-md shadow-sm">{c.slug || 'no-slug'}</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                <button onClick={() => handleEdit(c)} className="w-9 h-9 rounded-full bg-white text-text-main flex items-center justify-center hover:bg-accent hover:text-white transition-colors shadow-sm ring-1 ring-black/5"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(c.id!)} className="w-9 h-9 rounded-full bg-white text-text-main flex items-center justify-center hover:bg-error hover:text-white transition-colors shadow-sm ring-1 ring-black/5"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-sm font-medium text-text-secondary mt-2 line-clamp-2 leading-relaxed">{c.description || 'No description provided.'}</p>
          </div>
        ))}
        {categories.length === 0 && (
           <div className="col-span-full neo-card border border-dashed border-border-subtle flex flex-col items-center justify-center p-16 text-center mt-8 shadow-none bg-bg-surface">
             <div className="w-16 h-16 bg-bg-hover rounded-2xl flex items-center justify-center mb-6">
                <FolderTree className="w-8 h-8 text-text-muted opacity-50" />
             </div>
             <h3 className="text-xl font-bold mb-2 text-text-main">No Categories</h3>
             <p className="text-text-muted font-medium text-base max-w-md">Create your first product category to get started.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card w-full max-w-[500px] shadow-2xl rounded-3xl animate-in zoom-in-95 duration-200 p-0 border border-border-subtle overflow-hidden">
            <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-bg-surface">
              <h2 className="text-xl font-bold text-text-main tracking-tight">{isEditing ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-main transition-colors hover:bg-bg-hover p-2 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="c-name" className="block text-sm font-semibold text-text-main">Name</label>
                <input id="c-name" required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="neo-input w-full px-4 h-12" />
              </div>
              <div className="space-y-2">
                <label htmlFor="c-slug" className="block text-sm font-semibold text-text-main">Slug</label>
                <input id="c-slug" type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="neo-input w-full px-4 h-12" />
              </div>
              <div className="space-y-2">
                <label htmlFor="c-desc" className="block text-sm font-semibold text-text-main">Description</label>
                <textarea id="c-desc" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="neo-input w-full resize-y min-h-[100px] p-4" />
              </div>
              <div className="pt-4">
                 <button type="submit" className="neo-button w-full h-12 text-base bg-accent font-semibold text-white shadow-sm hover:opacity-90">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card w-full max-w-sm rounded-2xl shadow-xl animate-in zoom-in-95 duration-200 border border-border-subtle overflow-hidden">
            <div className="p-6 border-b border-border-subtle bg-error/5">
              <h2 className="text-lg font-bold text-error tracking-tight">Confirm Deletion</h2>
            </div>
            <div className="p-6 bg-bg-card">
              <p className="text-text-main font-medium text-sm mb-6">Are you sure you want to delete this category? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  className="neo-button flex-1 bg-bg-hover text-text-main py-2.5 text-sm font-semibold hover:bg-bg-surface border border-border-subtle transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="neo-button flex-1 bg-error text-white py-2.5 text-sm font-semibold hover:bg-error/90 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
