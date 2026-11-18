import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import api from "@/api";
import type { ProductPublicView } from "@/types/product";
import { useCart } from "@/hooks/useCart";

import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductPrice from "./components/ProductPrice";
import ProductStock from "./components/ProductStock";
import ProductPurchase from "./components/ProductPurchase";

export default function Product() {
  const location = useLocation();
  const slug = location.pathname.split("/").filter(Boolean).pop() ?? "";

  const { addItem } = useCart();

  const [product, setProduct] = useState<ProductPublicView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<ProductPublicView>(
          `/products/slug/${slug}`
        );

        if (active) {
          setProduct(response.data);
        }
      } catch {
        if (active) {
          setError("Não foi possível carregar o produto.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      fetchProduct();
    } else {
      setError("Produto não encontrado.");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [slug]);

  const handleAddToCart = async (quantity: number) => {
    if (!product) return;

    try {
      setAddingToCart(true);
      setSuccessMessage("");

      await addItem(product.id, quantity);

      setSuccessMessage("Produto adicionado ao carrinho.");
    } catch {
      setError("Não foi possível adicionar o produto ao carrinho.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFCFA]">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-[#747A74]">Carregando produto...</p>
        </div>
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen bg-[#FCFCFA]">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-[#A34B42]">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block text-sm font-medium text-[#34483A] hover:underline"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    );
  }

  if (!product) return null;

  return (
    <main className="min-h-screen bg-[#FCFCFA]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#747A74]">
          <Link to="/" className="transition-colors hover:text-[#34483A]">
            Início
          </Link>
          <span>/</span>
          <span className="font-medium text-[#272B28]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery
            images={product.images}
            title={product.title}
          />

          <div className="min-w-0">
            <ProductInfo
              title={product.title}
              description={product.description}
            />

            <div className="mt-8 border-t border-[#E2E3DD] pt-6">
              <ProductPrice
                price={product.price}
                salePrice={product.salePrice}
              />

              <div className="mt-6">
                <ProductStock stock={product.stock} />
              </div>

              <ProductPurchase
                stock={product.stock}
                onAddToCart={handleAddToCart}
              />

              {addingToCart && (
                <p className="mt-3 text-sm text-[#747A74]">
                  Adicionando ao carrinho...
                </p>
              )}

              {successMessage && (
                <p className="mt-3 text-sm font-medium text-[#34483A]">
                  {successMessage}
                </p>
              )}

              {error && (
                <p className="mt-3 text-sm text-[#A34B42]">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}