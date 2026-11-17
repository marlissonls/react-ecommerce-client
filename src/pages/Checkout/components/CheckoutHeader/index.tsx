
import { Link } from "react-router";

function CheckoutHeader() {
  return (
    <header className="mb-10">
      <Link
        to="/carrinho"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#747A74] transition-colors hover:text-[#34483A]"
      >
        <span aria-hidden="true">←</span>
        Voltar ao carrinho
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#272B28] sm:text-3xl">
          Finalizar pedido
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#747A74]">
          Revise os produtos selecionados e confirme seu pedido.
        </p>
      </div>
    </header>
  );
}

export default CheckoutHeader;
