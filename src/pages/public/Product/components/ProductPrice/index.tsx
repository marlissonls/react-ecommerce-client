type ProductPriceProps = {
  price: number;
  salePrice: number | null;
};

function ProductPrice({ price, salePrice }: ProductPriceProps) {
  const hasSale = salePrice !== null && salePrice < price;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="mt-6">
      {hasSale ? (
        <>
          <span className="text-sm text-[#747A74] line-through">
            {formatPrice(price)}
          </span>

          <p className="mt-1 text-3xl font-bold text-[#34483A]">
            {formatPrice(salePrice)}
          </p>
        </>
      ) : (
        <p className="text-3xl font-bold text-[#272B28]">
          {formatPrice(price)}
        </p>
      )}
    </div>
  );
}

export default ProductPrice;