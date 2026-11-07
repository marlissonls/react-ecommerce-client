import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "@/api";

export type CartItem = {
  productId: string;
  productTitle: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};

export type Cart = {
  id: string;
  customerId: string;
  subTotalAmount: number;
  items: CartItem[];
};

type CartContextData = {
  cart: Cart | null;
  items: CartItem[];
  subTotalAmount: number;
  loading: boolean;
  mutating: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
};

const CartContext = createContext<CartContextData | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    try {
      const response = await api.get("/carts");
      setCart(response.data);
      setError(null);
    } catch {
      setError("Não foi possível carregar o carrinho.");
      throw new Error("Cart loading failed.");
    }
  }, []);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        await refreshCart();
      } catch {
        // Error is already handled by refreshCart.
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (productId: string, quantity: number) => {
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
        setMutating(false);
      }
    },
    [refreshCart]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      try {
        setMutating(true);
        setError(null);

        await api.delete(`/carts/items/product/${productId}`);

        await refreshCart();
      } catch {
        setError("Não foi possível remover o produto do carrinho.");
        throw new Error("Removing cart item failed.");
      } finally {
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
    removeItem,
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