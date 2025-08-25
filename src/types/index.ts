// Common types used across the adminfrontend

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'agent' | 'landlord' | 'tenant';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}



