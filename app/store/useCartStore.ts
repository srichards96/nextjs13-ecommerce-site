import { create } from "zustand";
import { StorageValue, persist } from "zustand/middleware";
import { enableMapSet, produce } from "immer";

enableMapSet();

type CartItem = {
  id: string;
  size: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  cart: Map<string, CartItem>;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  changeItemQuantity: (id: string, size: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: new Map(),

      addItem: (item) => {
        if (item.quantity <= 0) {
          return;
        }

        set(
          produce<CartState>((state) => {
            const key = `[${item.id},${item.size}]`;

            if (state.cart.has(key)) {
              return;
            }

            state.cart.set(key, item);
          })
        );
      },

      removeItem: (id, size) => {
        set(
          produce<CartState>((state) => {
            const key = `[${id},${size}]`;

            state.cart.delete(key);
          })
        );
      },

      changeItemQuantity: (id, size, quantity) => {
        set(
          produce<CartState>((state) => {
            const key = `[${id},${size}]`;

            if (!state.cart.has(key)) {
              return;
            }

            const cartItem = state.cart.get(key)!;
            cartItem.quantity += quantity;

            if (cartItem.quantity > 0) {
              state.cart.set(key, cartItem);
            } else {
              state.cart.delete(key);
            }
          })
        );
      },

      clear: () => {},
    }),
    {
      name: "cart-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              cart: new Map(state.cart),
            },
          };
        },
        setItem: (name, newValue: StorageValue<CartState>) => {
          // functions cannot be JSON encoded
          const str = JSON.stringify({
            state: {
              ...newValue.state,
              cart: Array.from(newValue.state.cart.entries()),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
