export type LeadStatus = 'new' | 'contacted' | 'converted' | 'closed';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  product: string;
  productId: string;
  message: string;
  createdAt: string;
  status: LeadStatus;
}
