export type Role = 'admin' | 'user';

export interface User {
  id: string;
  role: Role;
  name?: string;
  email: string;
  storeId?: string;
  createdAt: string;
}

export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Product {
  id: string;
  title: string;
  categoryId?: string;
  shortDescription?: string;
  longDescription?: string;
  thumbnail?: string;
  fileUrl?: string; // external link
  tags?: string[];
  status: ProductStatus;
  price?: number;
  deliveryNote?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  logo?: string;
  brandColor?: string;
  bio?: string;
  selectedProductIds?: string[];
  createdAt: string;
}

export type LeadStatus = 'new' | 'contacted' | 'interested' | 'won' | 'lost';

export interface Lead {
  id: string;
  storeId: string;
  productId?: string;
  name?: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  source?: string;
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
