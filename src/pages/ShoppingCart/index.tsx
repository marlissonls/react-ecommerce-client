import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useCart } from "@/hooks/useCart";

import CartHeader from "./components/CartHeader";
import CartItemList from "./components/CartItemList";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";
import UnavailableProductsModal from "./components/UnavailableProductsModal";

function ShoppingCart() {
  const navigate = useNavigate();

  const {
    cart,
    items,
    subTotalAmount,
    loading,
    mutating,
    error,
    refreshCart,
    removeItems,
  } = useCart();

  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    refreshCart().catch(() => {});
  }, [refreshCart]);

  const handleRemove = async (productId: string) => {
    if (mutating) return;

    try {
      setRemovingProductId(productId);
      await removeItems([productId]);
    } catch {
      // Error is handled by CartProvider.
    } finally {
      setRemovingProductId(null);
    }
  };

  const handleCheckout = () => {
    const unavailableItems = items.filter(
      (item) => item.availability !== "AVAILABLE"
    );
  
    if (unavailableItems.length > 0) {
      setIsModalOpen(true);
      return;
    }
  
    navigate("/checkout");
  };

  const handleConfirmCheckout = async () => {
    const unavailableProductIds = items
      .filter((item) => item.availability !== "AVAILABLE")
      .map((item) => item.productId);
  
    try {
      await removeItems(unavailableProductIds)
  
      setIsModalOpen(false);
      navigate("/checkout");
    } catch {
      // O erro será tratado pelo CartProvider.
    }
  };

  if (loading && !cart) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm text-[#747A74]">
          Carregando seu carrinho...
        </p>
      </main>
    );
  }

  if (error && !cart) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-2xl font-bold text-[#272B28]">
          Não foi possível carregar seu carrinho
        </h1>

        <p className="mt-3 text-sm text-[#747A74]">
          Tente novamente em alguns instantes.
        </p>

        <button
          type="button"
          onClick={() => refreshCart().catch(() => {})}
          className="mt-6 rounded-lg bg-[#34483A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#293B2F]"
        >
          Tentar novamente
        </button>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <CartHeader itemCount={items.length} />

      {error && (
        <p className="mb-6 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <section className="min-w-0">
          <CartItemList
            items={items}
            onRemove={handleRemove}
            removingProductId={removingProductId}
          />

          <Link
            to="/catalogo?onSale=true"
            className="mt-6 inline-flex text-sm font-semibold text-[#34483A] transition-colors hover:text-[#293B2F]"
          >
            ← Continuar comprando
          </Link>
        </section>

        <CartSummary
          itemCount={items.length}
          subTotalAmount={subTotalAmount}
          onCheckout={handleCheckout}
          mutating={mutating}
        />
      </div>

      {isModalOpen && (
        <UnavailableProductsModal
          items={items.filter(
            (item) => item.availability !== "AVAILABLE"
          )}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmCheckout}
          loading={mutating}
        />
      )}
    </main>
  );
}

export default ShoppingCart;