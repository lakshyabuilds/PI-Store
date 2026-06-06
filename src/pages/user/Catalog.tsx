import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Product, Store } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle2, PackageOpen, DownloadCloud } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../../lib/utils';
import { motion } from 'motion/react';

export default function Catalog() {
  const { userProfile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pSnap = await getDocs(query(collection(db, 'products')));
        const activeProducts = pSnap.docs.map(d => ({ id: d.id, ...d.data() } as Product)).filter(p => p.status === 'active');
        setProducts(activeProducts);

        if (userProfile?.storeId) {
          const sDoc = await getDoc(doc(db, 'stores', userProfile.storeId));
          if (sDoc.exists()) {
            setStore({ id: sDoc.id, ...sDoc.data() } as Store);
          }
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'products');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userProfile]);

  const toggleProduct = async (productId: string) => {
    if (!store) return;
    const currentList = store.selectedProductIds || [];
    const newList = currentList.includes(productId) 
      ? currentList.filter(id => id !== productId) 
      : [...currentList, productId];
    
    try {
      await updateDoc(doc(db, 'stores', store.id), { selectedProductIds: newList });
      setStore({ ...store, selectedProductIds: newList });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `stores/${store.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-6 w-full max-w-5xl mx-auto">
        <div className="h-10 w-64 bg-bg-surface animate-shimmer rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-bg-card rounded-2xl animate-shimmer"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pb-16">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          {store && (!store.selectedProductIds || store.selectedProductIds.length === 0) && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-4">
              Step 2 of 2: Add Products
            </div>
          )}
          <h2 className="text-4xl font-black text-text-main tracking-tight mb-2 flex items-center gap-3">
             <DownloadCloud className="w-8 h-8 text-primary" /> Curated Catalog
          </h2>
          <p className="text-text-muted text-lg font-medium max-w-2xl">
            Plug-and-play proven winners. Add these market-tested digital products to your store with one click.
          </p>
        </div>
        {store && (!store.selectedProductIds || store.selectedProductIds.length === 0) ? (
          <div className="md:text-right shrink-0 mt-4 md:mt-0">
             <div className="text-alert font-bold bg-alert/10 px-4 py-2 rounded-xl animate-pulse text-sm">
               Select at least one product
             </div>
          </div>
        ) : (
          <div className="md:text-right shrink-0 mt-4 md:mt-0">
             <a href="/app" className="neo-button bg-text-main text-bg-base font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform text-sm shadow-xl">
               Finish Setup
             </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => {
          const isSelected = store?.selectedProductIds?.includes(p.id);
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={p.id} 
              className={`neo-card flex flex-col group relative overflow-hidden transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-primary border-primary shadow-[0_0_20px_rgba(57,255,20,0.15)] bg-primary/5' 
                  : 'hover:shadow-xl hover:border-border-strong bg-bg-card'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 p-4 z-10">
                   <div className="bg-primary text-bg-base text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                     <CheckCircle2 className="w-3 h-3" /> ACTIVE ON STORE
                   </div>
                </div>
              )}
              
              <div className="aspect-video bg-bg-surface relative overflow-hidden rounded-t-2xl">
                 {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted bg-gradient-to-br from-bg-surface to-bg-card">
                       <PackageOpen className="w-12 h-12 mb-2 opacity-30" />
                    </div>
                  )}
                 {/* Premium overlay gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight leading-tight">{p.title}</h3>
                <p className="text-sm text-text-muted line-clamp-2 mb-6 font-medium leading-relaxed">{p.shortDescription}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  {/* Suggested price tag */}
                  <div className="flex flex-col">
                     <span className="text-xs text-text-muted font-bold tracking-wider uppercase mb-0.5">Suggested</span>
                     <div className="flex items-center gap-1 text-text-main font-black text-xl">
                       ${p.price?.toFixed(2) || '0.00'}
                     </div>
                  </div>
                  <button
                    disabled={!store}
                    onClick={() => toggleProduct(p.id)}
                    className={`h-11 px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      isSelected 
                        ? 'bg-alert/10 text-alert hover:bg-alert/20' 
                        : 'bg-text-main text-bg-base hover:scale-105 shadow-md active:scale-95'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Add to Store'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
        {products.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
             <PackageOpen className="w-16 h-16 text-text-muted opacity-30 mb-4" />
             <h3 className="text-xl font-bold text-text-main mb-2">No Products Available</h3>
             <p className="text-text-muted">The admin has not uploaded any curated products yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
