type CartHeaderProps = {
  itemCount: number;
};

function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <div className="mb-10">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#747A74]">
        Sua seleção
      </span>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#272B28]">
        Meu carrinho
      </h1>

      <p className="mt-2 text-sm text-[#747A74]">
        {itemCount} {itemCount === 1 ? "produto" : "produtos"} no carrinho
      </p>
    </div>
  );
}

export default CartHeader;