import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Store, StoreProduct, CatalogProduct, Order } from "../../types";
import { OperationType, handleFirestoreError } from "../../lib/utils";
import {
  Sparkles,
  User,
  Package,
  ChevronRight,
  X,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const JsonLd = ({ data }: { data: any }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default function Storefront() {
  const { slug } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(
    null,
  );
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [buyForm, setBuyForm] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

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

        const q = query(collection(db, "stores"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          storeData = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
          } as Store;
        } else {
          const docRef = doc(db, "stores", slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            storeData = { id: docSnap.id, ...docSnap.data() } as Store;
          }
        }

        if (storeData) {
          setStore(storeData);

          // Fetch store products
          const spQ = query(
            collection(db, "storeProducts"),
            where("storeId", "==", storeData.id),
            where("isActive", "==", true),
          );
          const spSnap = await getDocs(spQ);
          const spList: StoreProduct[] = [];

          for (const d of spSnap.docs) {
            const spData = d.data() as StoreProduct;
            spData.id = d.id;
            // Fetch underlying catalog product
            const catDoc = await getDoc(
              doc(db, "products", spData.catalogProductId),
            );
            if (catDoc.exists()) {
              spData.catalogProduct = {
                id: catDoc.id,
                ...catDoc.data(),
              } as CatalogProduct;
              spList.push(spData);
            }
          }

          setStoreProducts(spList);
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
      if (e.key === "Escape") {
        resetModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !selectedProduct || !selectedProduct.catalogProduct) return;
    setSubmitting(true);
    try {
      const basePrice = selectedProduct.catalogProduct.basePrice || 0;
      const profit = selectedProduct.sellingPrice - basePrice;
      const creatorProfit = profit * 0.8;
      const adminProfit = basePrice + profit * 0.2;

      const orderData: Omit<Order, "id"> = {
        storeId: store.id,
        catalogProductId: selectedProduct.catalogProduct.id,
        storeProductId: selectedProduct.id,
        buyerEmail: buyForm.email,
        buyerName: buyForm.name,
        amountPaid: selectedProduct.sellingPrice,
        basePrice: basePrice,
        creatorProfit: creatorProfit,
        adminProfit: adminProfit,
        paymentGateway: "manual", // mocked
        paymentStatus: "completed",
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "orders"), orderData);

      // Pass the secret download link immediately in the mockup
      setDownloadLink(
        selectedProduct.catalogProduct.fileUrl ||
          "No download link provided by Admin.",
      );
      setSuccess(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "orders");
    } finally {
      setSubmitting(false);
    }
  };

  const resetModal = () => {
    setSuccess(false);
    setSelectedProduct(null);
    setIsContactModalOpen(false);
    setDownloadLink(null);
    setBuyForm({ name: "", email: "" });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!store)
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl text-gray-900 mb-4 font-black tracking-tight">
          Store Not Found
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          The shop you are looking for does not exist.
        </p>
      </div>
    );

  const primary = store.primaryColor || "#171717";
  const secondary = store.secondaryColor || "#f3f4f6";
  const accent = store.accentColor || "#3b82f6";

  return (
    <div
      className="font-sans min-h-screen flex justify-center selection:bg-black/10"
      style={{ backgroundColor: secondary }}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: store.name,
          url: `https://${window.location.hostname}/s/${store.slug}`,
          description: store.bio || `${store.name} digital product store.`,
        }}
      />

      <div className="w-full max-w-[480px] min-h-screen flex flex-col relative sm:border-x border-black/5 bg-white mx-auto shadow-2xl">
        {/* Header / Hero */}
        <section
          className="pt-16 pb-12 px-6 flex flex-col items-center text-center relative z-10"
          style={{ backgroundColor: secondary }}
        >
          {selectedProduct === null && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-32 h-32 mb-8"
            >
              {store.logoUrl ? (
                <img
                  src={store.logoUrl}
                  alt={store.name}
                  className="w-full h-full rounded-2xl object-cover ring-4 ring-white shadow-xl"
                />
              ) : (
                <div
                  className="w-full h-full rounded-2xl flex items-center justify-center text-white font-bold text-5xl shadow-xl ring-4 ring-white"
                  style={{ backgroundColor: primary }}
                >
                  {store.name ? store.name.charAt(0).toUpperCase() : "S"}
                </div>
              )}
              {/* Trust Badge */}
              <div
                className="absolute -bottom-2 -right-2 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                title="Verified Creator"
                style={{ backgroundColor: accent }}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
            </motion.div>
          )}

          <h1 className="text-3xl text-gray-900 mb-3 tracking-tighter font-black drop-shadow-sm">
            {store.name}
          </h1>
          {store.bio && (
            <p className="text-gray-600 text-base leading-relaxed max-w-sm font-medium">
              {store.bio}
            </p>
          )}
        </section>

        {/* Products List */}
        <section className="px-5 pb-20 flex-1 flex flex-col gap-4 relative z-10 -mt-6">
          {storeProducts.length === 0 ? (
            <div className="text-center py-12 rounded-3xl bg-white border border-dashed border-gray-300 shadow-sm">
              <Package className="w-10 h-10 mx-auto text-gray-300 mb-4 opacity-50" />
              <p className="text-gray-500 font-bold text-lg">
                No products listed yet.
              </p>
            </div>
          ) : (
            storeProducts.map((p, i) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="group w-full bg-white rounded-3xl border-2 border-transparent hover:border-black/5 active:scale-[0.98] transition-all text-left shadow-lg overflow-hidden relative"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ backgroundColor: primary }}
                ></div>

                <div className="p-4 flex items-center gap-4 relative z-10">
                  <div className="w-24 h-24 rounded-2xl bg-gray-50 overflow-hidden shrink-0 shadow-inner">
                    {p.customThumbnailUrl || p.catalogProduct?.thumbnailUrl ? (
                      <img
                        src={
                          p.customThumbnailUrl || p.catalogProduct?.thumbnailUrl
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <Package className="w-8 h-8 text-gray-300 opacity-50" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 overflow-hidden py-1">
                    <h3 className="font-bold text-gray-900 text-xl leading-tight line-clamp-2 mb-1.5 transition-colors">
                      {p.customTitle || p.catalogProduct?.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-1 mb-3 font-medium">
                      {p.customDescription ||
                        p.catalogProduct?.shortDescription}
                    </p>
                    <div
                      className="font-black text-xl flex items-center gap-2"
                      style={{ color: primary }}
                    >
                      <span>₹{p.sellingPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))
          )}

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="mt-6 w-full py-5 text-center text-gray-900 font-bold hover:bg-gray-100 rounded-2xl transition-colors"
          >
            Contact {store.name}
          </button>
        </section>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {(selectedProduct || isContactModalOpen) && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full sm:max-w-[480px] rounded-t-[32px] sm:rounded-3xl shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[90vh] sm:max-h-[85vh] border border-gray-100"
            >
              <div
                className="w-full flex justify-center pt-4 pb-2 sm:hidden cursor-grab"
                onClick={resetModal}
              >
                <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
              </div>

              <button
                onClick={resetModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors z-20 hidden sm:flex"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4 pb-12 sm:pt-6">
                {success ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="font-black text-3xl text-gray-900 mb-2">
                      Payment Successful!
                    </h3>
                    <p className="text-gray-500 text-base mb-8 font-medium">
                      Thank you for your purchase from {store.name}.
                    </p>

                    <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
                      <p className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                        Your Download Link
                      </p>
                      <p className="text-sm text-gray-600 font-mono bg-white p-3 rounded-lg border border-gray-200 break-all select-all">
                        {downloadLink}
                      </p>
                      <a
                        href={downloadLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full h-12 rounded-xl text-white font-bold text-base flex items-center justify-center transition-transform active:scale-[0.98]"
                        style={{ backgroundColor: accent }}
                      >
                        Download Now
                      </a>
                    </div>

                    <button
                      onClick={resetModal}
                      className="text-gray-500 font-bold hover:text-gray-900 transition-colors"
                    >
                      Back to Store
                    </button>
                  </div>
                ) : selectedProduct ? (
                  <div className="flex flex-col">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 mb-6 border border-gray-100">
                      {selectedProduct.customThumbnailUrl ||
                      selectedProduct.catalogProduct?.thumbnailUrl ? (
                        <img
                          src={
                            selectedProduct.customThumbnailUrl ||
                            selectedProduct.catalogProduct?.thumbnailUrl
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <h2 className="font-black text-2xl text-gray-900 mb-2 leading-tight">
                      {selectedProduct.customTitle ||
                        selectedProduct.catalogProduct?.title}
                    </h2>
                    <div
                      className="flex items-center gap-2 mb-6 text-2xl font-black"
                      style={{ color: primary }}
                    >
                      ₹{selectedProduct.sellingPrice.toFixed(2)}
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 text-sm text-gray-600 leading-relaxed font-medium">
                      {selectedProduct.customDescription ||
                        selectedProduct.catalogProduct?.shortDescription ||
                        selectedProduct.catalogProduct?.longDescription}
                    </div>

                    <div className="flex items-center gap-2 mb-8 justify-center">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: accent }}
                      ></div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        {generateTrustAnchor()}
                      </p>
                    </div>

                    <form onSubmit={handlePurchase} className="space-y-4">
                      <div>
                        <input
                          required
                          type="email"
                          value={buyForm.email}
                          onChange={(e) =>
                            setBuyForm({ ...buyForm, email: e.target.value })
                          }
                          className="neo-input w-full h-14 text-base shadow-sm focus:ring-2 transition-all border-gray-200"
                          style={{ "--tw-ring-color": primary } as any}
                          placeholder="Email Address for Delivery"
                        />
                      </div>
                      <div>
                        <input
                          required
                          type="text"
                          value={buyForm.name}
                          onChange={(e) =>
                            setBuyForm({ ...buyForm, name: e.target.value })
                          }
                          className="neo-input w-full h-14 text-base shadow-sm focus:ring-2 transition-all border-gray-200"
                          style={{ "--tw-ring-color": primary } as any}
                          placeholder="Your Full Name"
                        />
                      </div>
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full h-14 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:pointer-events-none"
                          style={{ backgroundColor: accent }}
                        >
                          {submitting
                            ? "Processing..."
                            : `Pay ₹${selectedProduct.sellingPrice.toFixed(2)}`}
                        </button>
                        <p className="text-center text-xs text-gray-400 font-medium mt-4 flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Secure mocked
                          checkout
                        </p>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-black text-2xl text-gray-900 mb-6">
                      Contact {store.name}
                    </h2>
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <input
                          required
                          type="text"
                          className="neo-input w-full border-gray-200"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <input
                          required
                          type="email"
                          className="neo-input w-full border-gray-200"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <textarea
                          rows={4}
                          className="neo-input w-full resize-none border-gray-200"
                          placeholder="How can we help?"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl text-white font-bold text-base transition-transform active:scale-[0.98] mt-4"
                        style={{ backgroundColor: accent }}
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
