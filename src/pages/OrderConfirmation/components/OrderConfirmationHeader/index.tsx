
import { CheckCircle2, Clock3 } from "lucide-react";

type OrderConfirmationHeaderProps = {
  orderId: string;
  status: string;
};

function OrderConfirmationHeader({
  orderId,
  status,
}: OrderConfirmationHeaderProps) {
  const isPending = status === "PENDING";

  return (
    <header className="mb-10 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF2EC]">
        {isPending ? (
          <Clock3 className="h-8 w-8 text-[#34483A]" />
        ) : (
          <CheckCircle2 className="h-8 w-8 text-[#34483A]" />
        )}
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-[#272B28] sm:text-3xl">
        Pedido criado com sucesso!
      </h1>

      <p className="mt-3 text-sm text-[#747A74]">
        Seu pedido foi registrado e está aguardando processamento.
      </p>

      <div className="mt-5 inline-flex flex-col items-center gap-1 rounded-lg bg-[#F3F1EA] px-5 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#92958F]">
          Número do pedido
        </span>

        <span className="font-mono text-sm font-semibold text-[#34483A]">
          {orderId}
        </span>
      </div>
    </header>
  );
}

export default OrderConfirmationHeader;
