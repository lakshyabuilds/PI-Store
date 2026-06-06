import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Store, Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Save, AlertCircle, Loader2, Store as StoreIcon, LayoutTemplate, Palette, Globe, Smartphone, Monitor, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '../../components/ErrorBoundary';

function StoreBuilderContent() {
  const { userProfile, currentUser } = useAuth();
  const navigate = useNavigate();
  const [store, setStore] = useState<Partial<Store>>({
    name: '',
    slug: '',
    logo: '',
    brandColor: '#171717',
    bio: '',
    selectedProductIds: []
  });
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fatalError, setFatalError] = useState<Error | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (fatalError) {
    throw fatalError;
  }

  useEffect(() => {
    const loadStore = async () => {
      try {
        if (userProfile?.storeId) {
          const sDoc = await getDoc(doc(db, 'stores', userProfile.storeId));
          if (sDoc.exists()) {
            setStore(sDoc.data() as Store);
            setExists(true);
          }
        }
        
        // Fetch all active products for the preview
        const pQ = query(collection(db, 'products'));
        const pSnap = await getDocs(pQ);
        const pMap: Record<string, Product> = {};
        pSnap.docs.forEach(d => {
          const pd = d.data() as Product;
          if (pd.status === 'active') {
            pMap[d.id] = { id: d.id, ...pd };
          }
        });
        setProducts(pMap);
      } catch (err) {
        setFatalError(err instanceof Error ? err : new Error('Failed to load store: ' + String(err)));
      } finally {
        setLoading(false);
      }
    };
    loadStore();
  }, [userProfile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !userProfile) return;
    setSaving(true);
    setFormError(null);
    
    try {
      // Validate slug uniqueness
      const slugQuery = query(collection(db, 'stores'), where('slug', '==', store.slug));
      const slugSnap = await getDocs(slugQuery);
      const isTaken = slugSnap.docs.some(d => exists ? d.id !== userProfile.storeId : d.id !== currentUser.uid);
      
      if (isTaken) {
        setFormError('This store slug is already taken. Please choose another one.');
        setSaving(false);
        return;
      }

      const newStoreId = userProfile.storeId || currentUser.uid;

      if (exists && userProfile.storeId) {
        await updateDoc(doc(db, 'stores', userProfile.storeId), {
          ...store
        });
      } else {
        const newStore = {
          ...store,
          ownerId: currentUser.uid,
          selectedProductIds: [],
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'stores', newStoreId), newStore);
        await updateDoc(doc(db, 'users', currentUser.uid), {
          storeId: newStoreId
        });
        setExists(true);
        navigate('/app/catalog');
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An unknown error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="h-10 w-10 text-accent animate-spin mb-6" />
        <h3 className="text-xl font-bold text-text-main tracking-tight">Loading settings</h3>
        <p className="text-base text-text-muted mt-2 font-medium">Please wait while we retrieve your configuration...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          {!exists && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs tracking-widest uppercase mb-4">
              Step 1 of 2: Store Setup
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main flex items-center gap-4">
             <div className="p-3 bg-accent/10 rounded-2xl hidden md:flex items-center justify-center">
               <StoreIcon className="w-8 h-8 text-accent" />
             </div>
            {exists ? 'Store Builder' : 'Create Your Store'}
          </h1>
          <p className="mt-4 text-text-muted text-base md:text-lg font-medium">
             {exists ? 'Configure your brand, preview your storefront, and manage structure.' : 'This is your storefront. Customize its look and feel before you add products to sell.'}
          </p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleSave} 
             disabled={saving}
             className="neo-button bg-accent text-white text-base h-12 px-8 inline-flex items-center justify-center disabled:opacity-50"
           >
              {saving ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : (exists ? <Save className="h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />)}
              {saving ? 'Saving...' : (exists ? 'Publish Changes' : 'Create & Continue')}
           </button>
        </div>
      </div>
      
      {formError && (
        <div className="mb-8 p-6 neo-card border border-error/50 bg-error/5 flex items-start gap-4 ring-1 ring-error/20">
          <AlertCircle className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-bold text-error">Failed to save store</h3>
            <p className="text-base text-error/80 mt-1 font-medium">{formError}</p>
          </div>
        </div>
      )}

      {/* 2-Column Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 pb-20">
        
        {/* Column 1: Brand Settings */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="neo-card p-6 md:p-8 bg-bg-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-8 flex items-center gap-3">
              <Palette className="w-5 h-5" /> Brand Settings
            </h2>
            <form id="store-form" className="space-y-6">
              <div>
                <label htmlFor="store-name" className="block text-sm font-bold text-text-main mb-2">Store Name</label>
                <input id="store-name" required type="text" value={store.name} onChange={e => setStore({...store, name: e.target.value})} className="neo-input w-full h-12" placeholder="My Awesome Store" />
              </div>
              <div>
                <label htmlFor="store-slug" className="block text-sm font-bold text-text-main mb-2">Store Slug</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">/s/</span>
                  <input id="store-slug" required type="text" value={store.slug} onChange={e => setStore({...store, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})} className="neo-input w-full pl-9 h-12" placeholder="my-store" />
                </div>
              </div>
              <div>
                <label htmlFor="store-logo" className="block text-sm font-bold text-text-main mb-2">Logo URL</label>
                <input id="store-logo" type="url" value={store.logo || ''} onChange={e => setStore({...store, logo: e.target.value})} className="neo-input w-full h-12" placeholder="https://..." />
              </div>
              <div>
                <label htmlFor="store-brand" className="block text-sm font-bold text-text-main mb-2">Brand Color</label>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg border border-border-subtle overflow-hidden shrink-0">
                    <input type="color" value={store.brandColor || '#171717'} onChange={e => setStore({...store, brandColor: e.target.value})} className="w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer" />
                  </div>
                  <input id="store-brand" type="text" value={store.brandColor || '#171717'} onChange={e => setStore({...store, brandColor: e.target.value})} className="neo-input w-full h-12 uppercase" placeholder="#171717" />
                </div>
              </div>
              <div>
                <label htmlFor="store-bio" className="block text-sm font-bold text-text-main mb-2">Bio / About</label>
                <textarea id="store-bio" rows={4} value={store.bio || ''} onChange={e => setStore({...store, bio: e.target.value})} className="neo-input w-full py-3 resize-none" placeholder="Tell your customers about your store..." />
              </div>
            </form>
          </div>
        </div>

        {/* Column 2: Live Preview */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
           <div className="flex items-center justify-between border border-border-subtle bg-bg-card rounded-xl p-3 px-5 shadow-sm">
             <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-text-muted" />
                <span className="text-sm font-medium text-text-muted truncate hidden sm:block">Live Preview: <a href={`/s/${store.slug || 'slug'}`} target="_blank" rel="noopener noreferrer" className="text-text-main font-bold hover:text-[var(--primary)] hover:underline transition-colors">{window.location.hostname}/s/{store.slug || 'slug'}</a></span>
             </div>
             <div className="flex items-center bg-bg-surface rounded-lg p-1">
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-bg-card text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-bg-card text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
             </div>
           </div>

           <div className="bg-bg-surface flex-1 rounded-2xl border border-border-subtle overflow-hidden flex items-center justify-center p-6 lg:p-12 min-h-[600px]">
              {/* Preview Containment Area */}
              <div 
                className={`bg-white shadow-xl border border-border-subtle rounded-2xl border-t-8 overflow-hidden transition-all duration-300 ring-1 ring-border-subtle/50 ${previewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full'}`}
                style={{ borderTopColor: store.brandColor || '#171717' }}
              >
                   {/* Mock Storefront inside Preview */}
                  <div className="flex flex-col h-full bg-[#FAFAFA] text-black font-sans relative">
                     <div className="h-16 flex items-center justify-center p-6 shrink-0 relative mt-4">
                        {store.logo ? (
                           <img src={store.logo} alt={store.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-xl absolute -bottom-8" />
                        ) : (
                           <div className="w-16 h-16 rounded-full text-white flex items-center justify-center font-bold text-xl shadow-xl absolute -bottom-8 ring-4 ring-white" style={{ backgroundColor: store.brandColor || '#00C853' }}>
                              {store.name ? store.name.charAt(0).toUpperCase() : 'S'}
                           </div>
                        )}
                     </div>
                     <div className="p-6 pt-12 flex-1 overflow-y-auto">
                        <div className="max-w-md mx-auto text-center mb-8">
                           <h2 className="font-bold text-2xl tracking-tight text-gray-900 mb-2">{store.name || 'Store Name'}</h2>
                           <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">{store.bio || 'Store bio will appear here after you add it on the left pane.'}</p>
                        </div>
                        <div className="flex flex-col gap-3 max-w-md mx-auto">
                           {(store.selectedProductIds || []).filter(id => products[id]).map(id => {
                              const p = products[id];
                              return (
                                 <div key={id} className="bg-white rounded-[1rem] border border-gray-200 p-2.5 flex items-center gap-3 hover:shadow-md transition-shadow group cursor-pointer active:scale-[0.98]">
                                     <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                        {p.thumbnail ? <img src={p.thumbnail} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-100"><Package className="w-5 h-5 text-gray-300" /></div>}
                                     </div>
                                     <div className="flex-1 overflow-hidden pr-2">
                                        <h3 className="font-bold text-[15px] tracking-tight truncate mb-0.5 text-gray-900">{p.title}</h3>
                                        <p className="text-xs font-semibold text-gray-500">${p.price?.toFixed(2) || '0.00'}</p>
                                     </div>
                                 </div>
                              );
                           })}
                           {(!store.selectedProductIds || store.selectedProductIds.length === 0) && (
                              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400 text-sm font-medium text-center">
                                 No products selected. Select products from the Digital Products tab.
                              </div>
                           )}
                           
                           <div className="mt-4 w-full h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: store.brandColor || '#00C853' }}>
                              Contact {store.name || 'Store'}
                           </div>
                        </div>
                     </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function StoreBuilder() {
  return (
    <ErrorBoundary>
      <StoreBuilderContent />
    </ErrorBoundary>
  );
}
