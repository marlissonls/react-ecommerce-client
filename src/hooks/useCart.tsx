import {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";

import api from "@/api";

import type { Cart, CartItem } from "@/types"

type CartContextData = {
  cart: Cart | null;
  items: CartItem[];
  subTotalAmount: number;
  loading: boolean;
  mutating: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addItem: (productId: string, quantity: number) => Promise<void>;
  removeItems: (productId: string[]) => Promise<void>;
};

const CartContext = createContext<CartContextData | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutationLock = useRef(false);

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await api.get("/carts");
      setCart(response.data);
    } catch {
      setError("Não foi possível carregar o carrinho.");
      throw new Error("Cart loading failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (productId: string, quantity: number) => {
      if (mutationLock.current) return;
  
      mutationLock.current = true;
  
      try {
        setMutating(true);
        setError(null);
  
        await api.post("/carts/items", {
          productId,
          quantity,
        });
  
        await refreshCart();
      } catch {
        setError("Não foi possível adicionar o produto ao carrinho.");
        throw new Error("Adding cart item failed.");
      } finally {
        mutationLock.current = false;
        setMutating(false);
      }
    },
    [refreshCart]
  );

  const removeItems = useCallback(
    async (productIds: string[]) => {
      if (mutationLock.current) return;
  
      mutationLock.current = true;
  
      try {
        setMutating(true);
        setError(null);
  
        await api.delete(`/carts/items`, {
          data: { productIds },
        });
  
        await refreshCart();
      } catch {
        setError("Não foi possível remover o produto do carrinho.");
        throw new Error("Removing cart item failed.");
      } finally {
        mutationLock.current = false;
        setMutating(false);
      }
    },
    [refreshCart]
  );

  const value: CartContextData = {
    cart,
    items: cart?.items ?? [],
    subTotalAmount: cart?.subTotalAmount ?? 0,
    loading,
    mutating,
    error,
    refreshCart,
    addItem,
    removeItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}