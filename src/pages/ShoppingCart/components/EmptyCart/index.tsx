import { Link } from "react-router";

function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F3F1EA]">
        <span className="text-3xl">🛒</span>
      </div>

      <h2 className="mt-6 text-2xl font-bold text-[#272B28]">
        Seu carrinho está vazio
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#747A74]">
        Parece que você ainda não adicionou nenhum produto.
        Explore nossa loja e encontre algo especial.
      </p>

      <Link
        to="/catalogo?onSale=true"
        className="mt-8 flex h-12 items-center justify-center rounded-lg bg-[#34483A] px-8 text-sm font-semibold !text-white transition-colors hover:bg-[#293B2F]"
      >
        Procurar produtos
      </Link>
    </div>
  );
}

export default EmptyCart;