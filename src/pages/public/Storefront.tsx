import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Store, Product } from '../../types';
import { OperationType, handleFirestoreError } from '../../lib/utils';
import { Sparkles, User, Package, ChevronRight, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const JsonLd = ({ data }: { data: any }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default function Storefront() {
  const { slug } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Trust anchor simulation
  const randomCites = ["London", "New York", "Toronto", "Sydney", "Berlin"];
  const randomMinutes = [2, 5, 12, 4, 8];
  
  const generateTrustAnchor = () => {
    const city = randomCites[Math.floor(Math.random() * randomCites.length)];
    const min = randomMinutes[Math.floor(Math.random() * randomMinutes.length)];
    return `Someone in ${city} bought this ${min} mins ago`;
  };

  useEffect(() => {
    const loadStore = async () => {
      if (!slug) return;
      try {
        let storeData: Store | null = null;
        
        const q = query(collection(db, 'stores'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          storeData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Store;
        } else {
          const docRef = doc(db, 'stores', slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            storeData = { id: docSnap.id, ...docSnap.data() } as Store;
          }
        }

        if (storeData) {
          setStore(storeData);
          if (storeData.selectedProductIds && storeData.selectedProductIds.length > 0) {
            const productPromises = storeData.selectedProductIds.map(pid => getDoc(doc(db, 'products', pid)));
            const productSnaps = await Promise.all(productPromises);
            const storeProducts = productSnaps
              .filter(snap => snap.exists())
              .map(snap => ({ id: snap.id, ...snap.data() } as Product))
              .filter(p => p.status === 'active');
            
            setProducts(storeProducts);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStore();
  }, [slug]);

  // Handle ESC gracefully
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setIsContactModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        storeId: store.id,
        productId: selectedProduct?.id || null,
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        notes: leadForm.message,
        salesValue: selectedProduct?.price || 0,
        source: 'Storefront',
        status: 'new',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedProduct(null);
        setIsContactModalOpen(false);
        setLeadForm({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'leads');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
     <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-text-main border-t-transparent rounded-full animate-spin"></div>
     </div>
  );
  if (!store) return (
     <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-6 text-center">
        <h1 className="heading-display text-4xl text-text-main mb-4">Store Not Found</h1>
        <p className="text-text-muted text-lg font-medium">The shop you are looking for does not exist.</p>
     </div>
  );

  return (
    <div className="font-sans min-h-screen bg-bg-base flex justify-center" style={{ '--brand': store.brandColor || 'var(--primary)' } as React.CSSProperties}>
      
      {/* Dynamic SEO Schemas */}
      {/* ... keeping JSON-LD for completeness ... */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": store.name,
        "url": `https://${window.location.hostname}/s/${store.slug}`,
        "description": store.bio || `${store.name} digital product store.`
      }} />

      {/* Mobile-first main container */}
      <div className="w-full max-w-[480px] min-h-screen flex flex-col relative sm:border-x border-border-subtle bg-bg-card/30 mx-auto shadow-2xl">
        
        {/* Header / Hero */}
        <section className="pt-16 pb-10 px-6 flex flex-col items-center text-center relative z-10">
          {selectedProduct === null && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative w-28 h-28 mb-6"
            >
              {store.logo ? (
                <img src={store.logo} alt={store.name} className="w-full h-full rounded-full object-cover ring-4 ring-bg-base/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-display font-bold text-5xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-4 ring-bg-base/50" style={{ backgroundColor: 'var(--brand)' }}>
                  {store.name ? store.name.charAt(0).toUpperCase() : 'S'}
                </div>
              )}
              {/* Trust Badge */}
              <div className="absolute bottom-0 right-0 bg-text-main text-bg-base w-8 h-8 rounded-full flex items-center justify-center border-4 border-bg-base shadow-lg" title="Verified Creator">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </motion.div>
          )}

          <h1 className="heading-display text-4xl text-text-main mb-3 tracking-tight font-black drop-shadow-sm">{store.name}</h1>
          {store.bio && (
             <p className="text-text-muted text-base leading-relaxed max-w-sm font-medium">{store.bio}</p>
          )}
        </section>

        {/* Products List (Single Column) */}
        <section className="px-5 pb-20 flex-1 flex flex-col gap-4 relative z-10">
          {products.length === 0 ? (
             <div className="text-center py-12 rounded-3xl bg-bg-surface/50 border border-dashed border-border-strong backdrop-blur-sm">
                <Package className="w-10 h-10 mx-auto text-text-muted mb-4 opacity-50" />
                <p className="text-text-muted font-bold text-lg">No products listed yet.</p>
             </div>
          ) : (
            products.map((p, i) => (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="group w-full bg-bg-card rounded-3xl border-2 border-transparent hover:border-[var(--brand)] active:scale-[0.98] transition-all text-left shadow-lg overflow-hidden relative"
              >
                {/* Background glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: 'var(--brand)' }}></div>
                
                <div className="p-4 flex items-center gap-4 relative z-10">
                  <div className="w-24 h-24 rounded-2xl bg-bg-surface overflow-hidden shrink-0 shadow-inner">
                    {p.thumbnail ? (
                      <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-bg-surface"><Package className="w-8 h-8 text-text-muted opacity-50" /></div>
                    )}
                  </div>
                  
                  <div className="flex-1 overflow-hidden py-1">
                     <h3 className="heading-display font-black text-text-main text-xl leading-tight line-clamp-2 mb-1.5 group-hover:text-[var(--brand)] transition-colors">{p.title}</h3>
                     <p className="text-text-muted text-sm line-clamp-1 mb-2 font-medium">{p.shortDescription}</p>
                     <div className="font-bold text-lg text-text-main flex items-center gap-2">
                        <span>${p.price?.toFixed(2) || '0.00'}</span>
                        <span className="text-xs font-bold uppercase tracking-widest bg-bg-surface px-2 py-0.5 rounded text-text-muted">Digital</span>
                     </div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-text-main flex items-center justify-center text-bg-base shrink-0 mr-1 shadow-md group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--brand)' }}>
                     <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.button>
            ))
          )}
          
          <button 
             onClick={() => setIsContactModalOpen(true)}
             className="mt-8 w-full py-5 text-center text-text-main font-bold hover:bg-bg-surface rounded-2xl transition-colors border-2 border-transparent hover:border-border-subtle"
          >
             Contact {store.name}
          </button>
        </section>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      </div>

      {/* "Blink" Checkout Modal (Bottom Sheet on Mobile) */}
      <AnimatePresence>
        {(selectedProduct || isContactModalOpen) && !success && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center sm:p-4">
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => { setSelectedProduct(null); setIsContactModalOpen(false); }}
               className="absolute inset-0 bg-text-main/20 backdrop-blur-sm"
            />

            {/* Sheet */}
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-bg-base w-full sm:max-w-[480px] rounded-t-[32px] sm:rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[90vh] sm:max-h-[85vh] border border-border-subtle"
            >
              {/* Drag Handle (Mobile only visually) */}
              <div className="w-full flex justify-center pt-4 pb-2 sm:hidden cursor-grab" onClick={() => { setSelectedProduct(null); setIsContactModalOpen(false); }}>
                 <div className="w-12 h-1.5 rounded-full bg-border-strong rounded"></div>
              </div>

              {/* Close Button Desktop */}
              <button 
                 onClick={() => { setSelectedProduct(null); setIsContactModalOpen(false); }} 
                 className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-surface flex items-center justify-center text-text-main hover:bg-bg-hover transition-colors z-20 hidden sm:flex"
              >
                  <X className="w-4 h-4" />
              </button>

              <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4 pb-12 sm:pt-6">
                
                {selectedProduct ? (
                   // Checkout Flow
                   <div className="flex flex-col">
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-bg-surface mb-6 border border-border-subtle">
                         {selectedProduct.thumbnail ? (
                            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-full h-full object-cover" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted">No Image</div>
                         )}
                      </div>
                      <h2 className="heading-display text-2xl text-text-main mb-2 leading-tight">{selectedProduct.title}</h2>
                      <div className="flex items-center gap-2 mb-6">
                         <span className="text-2xl font-bold text-text-main">${selectedProduct.price?.toFixed(2)}</span>
                         <span className="bg-alert/10 text-alert px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Sale</span>
                      </div>
                      
                      <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 mb-6 text-sm text-text-secondary leading-relaxed">
                         {selectedProduct.description || selectedProduct.shortDescription}
                      </div>

                      {/* Fake Trust Anchor */}
                      <div className="flex items-center gap-2 mb-6 justify-center">
                         <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                         <p className="text-xs font-bold text-text-main uppercase tracking-wider">{generateTrustAnchor()}</p>
                      </div>

                      {/* Fast Checkout Form */}
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                         <div>
                            <input id="sf-email" required type="email" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} className="neo-input w-full h-14 text-base shadow-sm focus:ring-2 focus:ring-[var(--brand)] transition-all" placeholder="Email Address" />
                         </div>
                         <div>
                            <input id="sf-name" required type="text" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} className="neo-input w-full hidden" placeholder="Name" />
                         </div>
                         {/* Big Tech Button Simulator */}
                         <div className="pt-2">
                           <button type="button" className="w-full h-14 rounded-2xl bg-black text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg mb-3">
                              Buy with <svg className="w-auto h-5" viewBox="0 0 42 16" fill="white"><path d="M19.782 15.688c-1.396 0-2.613-.393-3.654-1.18-.846-.642-1.464-1.434-1.854-2.378H14.1l2.062-8.52h2.868l-2.186 9.034c.597.7 1.39 1.05 2.378 1.05 1.077 0 1.956-.376 2.637-1.13.682-.752 1.133-1.688 1.353-2.808l1.492-6.146h2.902l-2.078 8.52h-2.628L22.68 10.99c-.313 1.4-1.01 2.508-2.094 3.32-1.083.818-2.394 1.227-3.934 1.227zM6.924 15.1l3.528-14.522h8.04c1.848 0 3.255.438 4.22 1.312.965.875 1.364 2.13 1.196 3.765-.303 2.87-1.93 4.887-4.88 6.052l2.673 3.393h-3.41l-2.305-3.08h-2.9l-.744 3.08H6.924zm3.013-12.01l-1.572 6.463h3.535c.783 0 1.464-.204 2.044-.613.58-.41.97-1.002 1.168-1.78.188-.8.15-1.5-.11-2.102-.262-.602-.7-.91-1.315-.92H9.937v-.048zm22.427 12.01L35.892 2.76l2.843-1.04-.6 6.368h.084l3.65-6.366h3.402l-4.75 7.4 2.128 6.04h-3.21l-1.12-3.88h-.12l-2.585 3.88h-3.22V15.1zm3.844-5.87l1.096-3.87h-.084l-2.12 3.87h1.108z"></path><path d="M3.24 9.17H.17c-.12 0-.21-.1-.21-.21V8.62c0-.12.1-.21.21-.21H3.24c1.23 0 2.22-1 2.22-2.22V.21C5.46.1 5.56 0 5.68 0h.35c.12 0 .21.1.21.21v5.98c0 1.42-1.16 2.58-2.58 2.58h-.42l-2.03 2.03v-1.63z"></path></svg>
                           </button>
                           <div className="relative flex items-center py-2">
                              <div className="flex-grow border-t border-border-subtle"></div>
                              <span className="flex-shrink-0 mx-4 text-text-muted text-sm font-medium">Or pay with card</span>
                              <div className="flex-grow border-t border-border-subtle"></div>
                           </div>
                           <button type="submit" disabled={submitting} className="w-full h-14 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:pointer-events-none mt-2" style={{ backgroundColor: 'var(--brand)' }}>
                              {submitting ? 'Processing...' : `Pay $${selectedProduct.price?.toFixed(2)}`}
                           </button>
                         </div>
                      </form>
                   </div>
                ) : (
                   // Contact Flow
                   <div>
                      <h2 className="heading-display text-2xl text-text-main mb-6">Contact Store</h2>
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <input id="sf-name" required type="text" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} className="neo-input w-full" placeholder="Your Name" />
                        </div>
                        <div className="space-y-1.5">
                          <input id="sf-email" required type="email" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} className="neo-input w-full" placeholder="Email Address" />
                        </div>
                        <div className="space-y-1.5">
                          <input id="sf-phone" type="text" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} className="neo-input w-full" placeholder="Phone (Optional)" />
                        </div>
                        <div className="space-y-1.5">
                          <textarea id="sf-msg" rows={4} value={leadForm.message} onChange={e => setLeadForm({...leadForm, message: e.target.value})} className="neo-input w-full resize-none" placeholder="How can we help?" />
                        </div>
                        <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl text-white font-bold text-base transition-transform active:scale-[0.98] mt-4" style={{ backgroundColor: 'var(--brand)' }}>
                          {submitting ? 'Sending Request...' : 'Send Message'}
                        </button>
                      </form>
                   </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success View */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-base z-[60] flex items-center justify-center flex-col text-center px-6"
          >
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring" }}
               className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-primary/30"
            >
               <ShieldCheck className="w-10 h-10" />
            </motion.div>
            <h3 className="heading-display text-2xl text-text-main mb-2">Request Processed</h3>
            <p className="text-text-muted text-base max-w-[280px]">Your information was received. {selectedProduct ? "Check your email for access instructions." : "The creator will be in touch soon."}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
