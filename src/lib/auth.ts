import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'secretary' | 'coordinator' | 'manager' | 'accountant';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  logout: () => void;
}

// Mock user data for demo
const mockUsers: Record<string, User> = {
  'admin@tax-office.com': {
    id: '1',
    email: 'admin@tax-office.com',
    name: 'שרה כהן',
    role: 'manager',
  },
  'secretary@tax-office.com': {
    id: '2',
    email: 'secretary@tax-office.com',
    name: 'מיכל לוי',
    role: 'secretary',
  },
  'coordinator@tax-office.com': {
    id: '3',
    email: 'coordinator@tax-office.com',
    name: 'רחל אברהם',
    role: 'coordinator',
  },
  'accountant@tax-office.com': {
    id: '4',
    email: 'accountant@tax-office.com',
    name: 'דנה ישראל',
    role: 'accountant',
  },
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would be an API call
        const user = mockUsers[email];
        if (!user) {
          throw new Error('משתמש לא נמצא');
        }
        
        set({ user, isAuthenticated: true });
        return user;
      },
      loginWithGoogle: async () => {
        // Mock Google authentication
        const user = mockUsers['admin@tax-office.com'];
        set({ user, isAuthenticated: true });
        return user;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const usePermissions = () => {
  const { user } = useAuth();
  
  const can = (permission: string) => {
    if (!user) return false;
    
    const permissions: Record<UserRole, string[]> = {
      manager: ['read:all', 'write:all', 'delete:all', 'admin'],
      coordinator: ['read:all', 'write:clients', 'write:tasks', 'read:reports'],
      accountant: ['read:clients', 'write:reports', 'read:tasks'],
      secretary: ['read:clients', 'write:tasks', 'read:reports'],
    };
    
    return permissions[user.role]?.includes(permission) || false;
  };
  
  return { can };
};