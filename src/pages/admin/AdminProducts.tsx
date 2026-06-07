import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { CatalogProduct, Category } from '../../types';
import { Plus, Pencil, Trash2, X, Package } from 'lucide-react';
import { OperationType, handleFirestoreError } from '../../lib/utils';

export default function AdminProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<CatalogProduct>>({
    title: '',
    categoryId: '',
    shortDescription: '',
    longDescription: '',
    thumbnailUrl: '',
    fileUrl: '',
    status: 'draft',
    basePrice: 0,
    srp: 0,
    tags: [],
    driveLink: ''
  });

  const fetchData = async () => {
    try {
      const pQ = query(collection(db, 'products'));
      const cQ = query(collection(db, 'categories'));
      const [pSnap, cSnap] = await Promise.all([getDocs(pQ), getDocs(cQ)]);
      
      setProducts(pSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CatalogProduct)));
      setCategories(cSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category)));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'products/categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), formData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          createdAt: new Date().toISOString()
        });
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ title: '', status: 'draft', basePrice: 0, srp: 0 });
      fetchData();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'products');
    }
  };

  const handleEdit = (p: CatalogProduct) => {
    setFormData(p);
    setEditingId(p.id!);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteDoc(doc(db, 'products', deletingId));
      setDeletingId(null);
      fetchData();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${deletingId}`);
    }
  };

  const seedDemoProducts = async () => {
    setIsSeeding(true);
    const demoProducts: Partial<CatalogProduct>[] = [
      {
        title: "Faceless Instagram Reels Bundle (1,000+ Assets)",
        shortDescription: "Viral ready. Just add your own text and audio. Perfect for theme pages.",
        longDescription: "Over 1,000 aesthetic, high-quality faceless videos. Perfect for running luxury and motivation theme pages on Instagram and TikTok without showing your face.",
        thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        fileUrl: "https://example.com/download/faceless",
        status: "active",
        basePrice: 27.00
      },
      {
        title: "ChatGPT Prompts for Marketers",
        shortDescription: "500+ copy-paste prompts to write ads, emails, and landing pages that sell.",
        longDescription: "The ultimate cheat sheet for marketers. Stop wasting hours prompting and get the exact frameworks used by 8-figure copywriters.",
        thumbnailUrl: "https://images.unsplash.com/photo-1664575196644-808978af9b1f?w=800&q=80",
        fileUrl: "https://example.com/download/prompts",
        status: "active",
        basePrice: 19.99
      },
      {
        title: "Ultimate Notion Life OS Layout",
        shortDescription: "Organize your entire life, business, and daily habits in one aesthetic workspace.",
        longDescription: "A complete done-for-you Notion system. Includes habit trackers, CRM, daily journals, and project management tools in a unified aesthetic dashboard.",
        thumbnailUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
        fileUrl: "https://example.com/download/notion",
        status: "active",
        basePrice: 49.00
      }
    ];

    try {
      for (const p of demoProducts) {
        await addDoc(collection(db, 'products'), {
          ...p,
          createdAt: new Date().toISOString()
        });
      }
      await fetchData();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'products/demo');
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {[1,2,3,4].map(i => <div key={i} className="neo-card h-[300px] animate-pulse bg-bg-card"></div>)}
     </div>
  );

  const statusColors = {
    active: 'text-[#17C964] bg-[#17C964]/10 ring-1 ring-[#17C964]/20',
    draft: 'text-[#F5A524] bg-[#F5A524]/10 ring-1 ring-[#F5A524]/20',
    archived: 'text-text-muted bg-bg-hover ring-1 ring-border-strong',
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-text-main">Global Products</h1>
          <p className="text-text-muted text-base md:text-lg font-medium max-w-3xl text-balance">Manage the master catalog of products available to all creator stores.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={seedDemoProducts}
            disabled={isSeeding}
            className="neo-button px-6 py-3 bg-bg-surface border-border-strong text-text-main font-semibold flex items-center shadow-sm disabled:opacity-50"
          >
            {isSeeding ? <span className="animate-spin mr-2">⟳</span> : <Package className="w-5 h-5 mr-2" />}
            {isSeeding ? 'Adding...' : 'Generate PLR Suite'}
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', status: 'draft', basePrice: 0, srp: 0 });
              setIsFormOpen(true);
            }}
            className="neo-button px-6 py-3 bg-accent text-white font-semibold flex items-center shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(p => (
           <div key={p.id} className="neo-card p-0 overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-lg hover:border-border-strong bg-bg-card">
             <div className="aspect-[4/3] bg-bg-surface relative shrink-0 border-b border-border-subtle overflow-hidden">
               {p.thumbnailUrl ? (
                 <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-text-muted font-medium text-sm">No Image</div>
               )}
               <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 translate-y-2 group-hover:translate-y-0">
                  <button onClick={() => handleEdit(p)} className="w-9 h-9 rounded-full bg-white text-text-main flex items-center justify-center hover:bg-accent hover:text-white transition-colors shadow-sm ring-1 ring-black/5">
                     <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id!)} className="w-9 h-9 rounded-full bg-white text-text-main flex items-center justify-center hover:bg-error hover:text-white transition-colors shadow-sm ring-1 ring-black/5">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
             </div>
             
             <div className="p-6 flex-1 flex flex-col pt-8 relative">
               <div className="absolute top-[-16px] left-6 flex justify-between items-center w-[calc(100%-48px)]">
                 <span className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-bg-card shadow-sm z-10 ${statusColors[p.status]}`}>
                    {p.status}
                 </span>
                 <span className="text-[14px] font-bold text-text-inverted bg-text-main px-3 py-1 rounded-lg shadow-sm z-10 -mr-2">₹{p.basePrice?.toFixed(2) || '0.00'}</span>
               </div>
               
               <h3 className="font-bold text-lg text-text-main mt-2 mb-1 tracking-tight line-clamp-1">{p.title}</h3>
               <p className="text-xs font-semibold text-text-muted mb-3">
                 {categories.find(c => c.id === p.categoryId)?.name || 'Uncategorized'}
               </p>
               
               <p className="text-sm text-text-secondary line-clamp-2 mt-auto">
                 {p.shortDescription || 'No description provided.'}
               </p>
             </div>
           </div>
        ))}
        {products.length === 0 && (
           <div className="col-span-full neo-card border border-dashed border-border-subtle flex flex-col items-center justify-center p-16 text-center mt-8 bg-bg-surface shadow-none">
             <div className="w-16 h-16 bg-bg-hover rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-text-muted opacity-50" />
             </div>
             <h3 className="text-xl font-bold mb-2 text-text-main">No Products Available</h3>
             <p className="text-text-muted font-medium text-base max-w-md">Add a product to the global catalog.</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-bg-card border-l border-border-subtle w-full max-w-[500px] h-full shadow-lg animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="px-6 py-5 border-b border-border-subtle flex justify-between items-center shrink-0 bg-bg-base">
              <h2 className="text-lg font-bold text-text-main tracking-tight">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-text-muted hover:text-text-main transition-colors p-2 rounded-xl hover:bg-bg-hover"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2 space-y-1.5">
                    <label htmlFor="p-title" className="block text-sm font-medium text-text-main tracking-tight">Title</label>
                    <input id="p-title" required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="neo-input w-full shadow-sm" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="p-cat" className="block text-sm font-medium text-text-main tracking-tight">Category</label>
                    <div className="relative border border-border-subtle rounded-lg focus-within:ring-1 focus-within:ring-accent focus-within:border-accent">
                       <select id="p-cat" value={formData.categoryId || ''} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full appearance-none pr-10 py-2.5 px-3 bg-transparent text-sm font-medium outline-none text-text-main shadow-sm">
                         <option value="">Select Category</option>
                         {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                       <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                       </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="p-status" className="block text-sm font-medium text-text-main tracking-tight">Status</label>
                    <div className="relative border border-border-subtle rounded-lg focus-within:ring-1 focus-within:ring-accent focus-within:border-accent shadow-sm">
                       <select id="p-status" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full appearance-none pr-10 py-2.5 px-3 bg-transparent text-sm font-medium outline-none text-text-main">
                         <option value="active">Active</option>
                         <option value="draft">Draft</option>
                         <option value="archived">Archived</option>
                       </select>
                       <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="p-shortdesc" className="block text-sm font-medium text-text-main tracking-tight">Short Description</label>
                    <input id="p-shortdesc" type="text" value={formData.shortDescription || ''} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="neo-input w-full shadow-sm" />
                  </div>
                  
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="p-longdesc" className="block text-sm font-medium text-text-main tracking-tight">Long Description</label>
                    <textarea id="p-longdesc" rows={4} value={formData.longDescription || ''} onChange={e => setFormData({...formData, longDescription: e.target.value})} className="neo-input w-full resize-y min-h-[100px] shadow-sm py-3" />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="p-thumb" className="block text-sm font-medium text-text-main tracking-tight">Thumbnail URL</label>
                    <input id="p-thumb" type="url" value={formData.thumbnailUrl || ''} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} className="neo-input w-full shadow-sm" />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="p-file" className="block text-sm font-medium text-text-main tracking-tight">External File URL</label>
                    <input id="p-file" type="url" value={formData.fileUrl || ''} onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="neo-input w-full shadow-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="p-drive" className="block text-sm font-medium text-text-main tracking-tight">Drive Link (Marketing Assets)</label>
                    <input id="p-drive" type="url" placeholder="https://drive.google.com/..." value={formData.driveLink || ''} onChange={e => setFormData({...formData, driveLink: e.target.value})} className="neo-input w-full shadow-sm" />
                  </div>

                  <div className="space-y-1.5 md:col-start-1">
                    <label htmlFor="p-price" className="block text-sm font-medium text-text-main tracking-tight">Base Price (₹)</label>
                    <div className="bg-bg-surface border border-border-subtle rounded-lg flex items-center focus-within:ring-1 focus-within:ring-accent focus-within:border-accent overflow-hidden px-0 shadow-sm">
                      <span className="text-text-muted font-medium pl-3 pr-1 select-none text-sm">₹</span>
                      <input id="p-price" type="number" min="0" step="0.01" value={formData.basePrice || 0} onChange={e => setFormData({...formData, basePrice: parseFloat(e.target.value)})} className="w-full bg-transparent border-none py-2.5 pr-3 text-sm text-text-main font-semibold outline-none focus:outline-none focus:ring-0" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="p-srp" className="block text-sm font-medium text-text-main tracking-tight">Suggested Retail Price (SRP) (₹)</label>
                    <div className="bg-bg-surface border border-border-subtle rounded-lg flex items-center focus-within:ring-1 focus-within:ring-accent focus-within:border-accent overflow-hidden px-0 shadow-sm">
                      <span className="text-text-muted font-medium pl-3 pr-1 select-none text-sm">₹</span>
                      <input id="p-srp" type="number" min="0" step="0.01" value={formData.srp || 0} onChange={e => setFormData({...formData, srp: parseFloat(e.target.value)})} className="w-full bg-transparent border-none py-2.5 pr-3 text-sm text-text-main font-semibold outline-none focus:outline-none focus:ring-0" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-border-subtle shrink-0 bg-bg-base">
               <button form="product-form" type="submit" className="neo-button w-full py-2.5 bg-text-main text-bg-base font-semibold text-sm shadow-sm hover:bg-text-main/90 transition-colors">Save Product</button>
            </div>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card w-full max-w-sm rounded-xl shadow-lg animate-in fade-in duration-200 border border-border-subtle overflow-hidden">
            <div className="p-5 border-b border-border-subtle bg-error/5 flex items-center">
              <h2 className="text-base font-bold text-error tracking-tight">Confirm Deletion</h2>
            </div>
            <div className="p-5 bg-bg-card">
              <p className="text-text-main font-medium text-sm mb-5">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 py-2 text-sm font-medium rounded-lg text-text-main bg-bg-hover hover:bg-bg-surface border border-border-subtle transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 text-sm font-medium rounded-lg text-white bg-error hover:bg-error/90 transition-colors shadow-sm"
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
