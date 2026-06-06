export type Role = 'admin' | 'user';

export interface User {
  id: string;
  role: Role;
  name?: string;
  email: string;
  storeId?: string;
  subscriptionStatus: 'trialing' | 'active' | 'past_due' | 'canceled';
  trialEndsAt?: string;
  createdAt: string;
}

export type ProductStatus = 'active' | 'draft' | 'archived';

// This is the main "Catalog" product uploaded by Admin
export interface CatalogProduct {
  id: string;
  title: string;
  categoryId?: string;
  shortDescription?: string;
  longDescription?: string;
  thumbnailUrl?: string; // Standard image for the catalog
  fileUrl?: string; // SECRET: Download link (only provided to buyers)
  tags?: string[];
  status: ProductStatus;
  basePrice: number; // Minimum margin/price that the admin takes
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
}

// This is the product as added to a Creator's store
export interface StoreProduct {
  id: string;
  storeId: string;
  catalogProductId: string;
  catalogProduct?: CatalogProduct; // Fetched/Populated for view
  customTitle?: string;
  customDescription?: string;
  customThumbnailUrl?: string; // Creator can override image via URL
  sellingPrice: number; // Must be >= catalogProduct.basePrice
  isActive: boolean;
  createdAt: string;
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  bio?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  storeId: string;
  catalogProductId: string;
  storeProductId: string;
  buyerEmail: string;
  buyerName?: string;
  amountPaid: number;
  basePrice: number;    // Snapshot of basePrice at time of purchase
  creatorProfit: number;
  adminProfit: number;
  paymentGateway: 'stripe' | 'razorpay' | 'manual';
  paymentStatus: 'pending' | 'completed' | 'failed';
  stripeSessionId?: string;
  razorpayOrderId?: string;
  createdAt: string;
}

export interface Wallet {
  userId: string;
  totalEarned: number;
  pendingPayout: number;
  lastPayoutDate?: string;
  payoutMethod?: 'upi' | 'bank_transfer';
  upiId?: string;
  bankDetails?: string;
  productsSoldLastMonth: number;
}

export interface Lead {
  id: string;
  storeId: string;
  productId?: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'interested' | 'won' | 'lost';
  salesValue?: number;
  notes?: string;
  createdAt: string;
}

export interface CrmNote {
  id: string;
  leadId: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

export interface Product {
  id?: string;
  title: string;
  categoryId?: string;
  shortDescription?: string;
  longDescription?: string;
  thumbnail?: string;
  fileUrl?: string; // SECRET: Download link
  tags?: string[];
  status: ProductStatus;
  price: number; 
  createdAt?: string;
}

