import { LaptopsType } from "@/types/laptops";
import { create } from "zustand";
interface CartItem extends LaptopsType {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i._id === item._id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      ),
    })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item._id !== itemId),
    })),
  clearCart: () => set({ items: [] }),
}));
