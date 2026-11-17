
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useCart } from "@/hooks/useCart";
import api from "@/api";

import CheckoutHeader from "./components/CheckoutHeader";
import CheckoutProgress from "./components/CheckoutProgress";
import CheckoutItemList from "./components/CheckoutItemList";
import CheckoutFeatureCard from "./components/CheckoutFeatureCard";
import CheckoutSummary from "./components/CheckoutSummary";
import CheckoutConfirmation from "./components/CheckoutConfirmation";

import {
  MapPin,
  CreditCard,
  Truck,
} from "lucide-react";

function Checkout() {
  const navigate = useNavigate();

  const {
    items,
    subTotalAmount,
    loading,
    refreshCart,
  } = useCart();

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshCart().catch(() => {});
  }, [refreshCart]);

  const handleConfirmCheckout = async () => {
    try {
      setCreatingOrder(true);
      setError(null);

      await api.post("/checkout");

      // A página de confirmação do pedido será adicionada posteriormente.
    } catch {
      setError("Não foi possível criar seu pedido. Tente novamente.");
    } finally {
      setCreatingOrder(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm text-[#747A74]">
          Carregando checkout...
        </p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-2xl font-bold text-[#272B28]">
          Seu carrinho está vazio
        </h1>

        <p className="mt-2 text-sm text-[#747A74]">
          Adicione produtos ao carrinho antes de finalizar seu pedido.
        </p>

        <Link
          to="/catalogo"
          className="mt-6 inline-flex text-sm font-semibold text-[#34483A] hover:text-[#293B2F]"
        >
          Voltar às compras
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <CheckoutHeader />

      <CheckoutProgress />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-10">
          <CheckoutItemList items={items} />

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-[#272B28]">
                Informações adicionais
              </h2>

              <p className="mt-1 text-xs text-[#92958F]">
                Algumas funcionalidades ainda estão em desenvolvimento.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <CheckoutFeatureCard
                title="Endereço de entrega"
                description="O gerenciamento de endereços ainda não está disponível."
                icon={<MapPin className="h-5 w-5" />}
              />

              <CheckoutFeatureCard
                title="Pagamento"
                description="A integração com meios de pagamento será disponibilizada futuramente."
                icon={<CreditCard className="h-5 w-5" />}
              />

              <CheckoutFeatureCard
                title="Entrega e frete"
                description="Cálculo de frete e previsão de entrega ainda não estão disponíveis."
                icon={<Truck className="h-5 w-5" />}
              />
            </div>
          </section>

          <CheckoutConfirmation />
        </div>

        <div>
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <CheckoutSummary
            itemCount={items.length}
            subTotalAmount={subTotalAmount}
            onConfirm={handleConfirmCheckout}
            loading={creatingOrder}
          />
        </div>
      </div>
    </main>
  );
}

export default Checkout;
