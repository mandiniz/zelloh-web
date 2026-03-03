// src/store/useUserStore.ts
import { create } from 'zustand';

interface UserState {
  balance: number;
  currency: string;
  isLoggedIn: boolean;
  setBalance: (amount: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  balance: 0,
  currency: 'USD',
  isLoggedIn: false,
  setBalance: (amount: number) => set({ balance: amount }),
}));