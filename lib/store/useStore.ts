import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { 
  User, 
  MerchantProfile, 
  InventoryItem, 
  PaymentReceipt, 
  Transaction,
  PaymentLink
} from '@/types';
import { mockMerchantProfile, mockInventory, mockReceipts, mockTransactions, mockPaymentLinks } from '@/lib/mockDb';

interface AppState {
  user: User | null;
  merchantProfile: MerchantProfile | null;
  inventory: InventoryItem[];
  receipts: PaymentReceipt[];
  transactions: Transaction[];
  paymentLinks: PaymentLink[];
  
  // Actions
  setUser: (user: User | null) => void;
  setMerchantProfile: (profile: MerchantProfile | null) => void;
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  addReceipt: (receipt: PaymentReceipt) => void;
  updateReceipt: (id: string, receipt: Partial<PaymentReceipt>) => void;
  addTransaction: (transaction: Transaction) => void;
  addPaymentLink: (link: PaymentLink) => void;
  
  // Auth actions
  login: (email: string, name: string) => void;
  signup: (email: string, name: string, userType: 'merchant' | 'developer') => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      merchantProfile: null,
      inventory: [],
      receipts: [],
      transactions: [],
      paymentLinks: [],

      setUser: (user) => set({ user }),
      setMerchantProfile: (profile) => set({ merchantProfile: profile }),
      addInventoryItem: (item) => set((state) => ({ inventory: [item, ...state.inventory] })),
      updateInventoryItem: (id, updatedItem) => set((state) => ({
        inventory: state.inventory.map((item) => item.id === id ? { ...item, ...updatedItem } : item)
      })),
      deleteInventoryItem: (id) => set((state) => ({
        inventory: state.inventory.filter((item) => item.id !== id)
      })),
      addReceipt: (receipt) => set((state) => ({ receipts: [receipt, ...state.receipts] })),
      updateReceipt: (id, updatedReceipt) => set((state) => ({
        receipts: state.receipts.map((r) => r.id === id ? { ...r, ...updatedReceipt } : r)
      })),
      addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),
      addPaymentLink: (link) => set((state) => ({ paymentLinks: [link, ...state.paymentLinks] })),

      login: (email, name) => {
        // For demo purposes, we'll just set the user
        const user: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name,
          userType: 'merchant',
          settlementCurrency: 'NGN',
          createdAt: new Date().toISOString()
        };
        
        // If it's a new login and no merchant profile exists, initialize with mocks
        set((state) => ({
          user,
          merchantProfile: state.merchantProfile || mockMerchantProfile,
          inventory: state.inventory.length > 0 ? state.inventory : mockInventory,
          receipts: state.receipts.length > 0 ? state.receipts : mockReceipts,
          transactions: state.transactions.length > 0 ? state.transactions : mockTransactions,
          paymentLinks: state.paymentLinks.length > 0 ? state.paymentLinks : mockPaymentLinks,
        }));
      },

      signup: (email, name, userType) => {
        const user: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name,
          userType,
          settlementCurrency: 'NGN',
          createdAt: new Date().toISOString()
        };

        const merchantProfile: MerchantProfile = {
          id: name.toLowerCase().replace(/\s+/g, '-'),
          ownerName: name,
          storeName: `${name}'s Store`,
          storeCategory: 'General',
          settlementCurrency: 'NGN',
          fixedCheckoutPath: `/pay/${name.toLowerCase().replace(/\s+/g, '-')}`,
          qrCodeSeed: `flux-${name.toLowerCase().replace(/\s+/g, '-')}`,
          createdAt: new Date().toISOString()
        };

        set({
          user,
          merchantProfile,
          inventory: mockInventory, // Initial mock inventory
          receipts: [],
          transactions: [],
          paymentLinks: []
        });
      },

      logout: () => set({ 
        user: null, 
        merchantProfile: null, 
        inventory: [], 
        receipts: [], 
        transactions: [], 
        paymentLinks: [] 
      }),
    }),
    {
      name: 'flux-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
