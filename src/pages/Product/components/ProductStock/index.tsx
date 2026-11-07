type ProductStockProps = {
  stock: number;
};

function ProductStock({ stock }: ProductStockProps) {
  const outOfStock = stock <= 0;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-[#272B28]">
        Disponibilidade
      </span>

      {outOfStock ? (
        <span className="text-sm font-medium text-[#A34B42]">
          Indisponível
        </span>
      ) : (
        <span className="text-sm font-medium text-[#34483A]">
          {stock} unidades disponíveis
        </span>
      )}
    </div>
  );
}

export default ProductStock;