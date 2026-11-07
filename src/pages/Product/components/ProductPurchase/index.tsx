import { useState } from "react";

type ProductPurchaseProps = {
  stock: number;
  onAddToCart: (quantity: number) => void;
};

function ProductPurchase({ stock, onAddToCart }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(value, stock)));
  };

  if (stock <= 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <div>
        <label
          htmlFor="product-quantity"
          className="mb-2 block text-sm font-medium text-[#272B28]"
        >
          Quantidade
        </label>

        <div className="flex h-11 w-fit items-center overflow-hidden rounded-lg border border-[#E2E3DD]">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Diminuir quantidade"
            className="h-full px-4 text-lg text-[#272B28] transition-colors hover:bg-[#F3F1EA] disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <input
            id="product-quantity"
            type="number"
            min={1}
            max={stock}
            value={quantity}
            onChange={(event) =>
              handleQuantityChange(Number(event.target.value))
            }
            className="h-full w-14 border-x border-[#E2E3DD] bg-transparent text-center text-sm font-medium text-[#272B28] outline-none"
          />

          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= stock}
            aria-label="Aumentar quantidade"
            className="h-full px-4 text-lg text-[#272B28] transition-colors hover:bg-[#F3F1EA] disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onAddToCart(quantity)}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-[#34483A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#293B2F]"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default ProductPurchase;