
import { CheckCircle2, Info } from "lucide-react";

function CheckoutConfirmation() {
  return (
    <section className="rounded-xl border border-[#D5D8D0] bg-[#F9F9F6] p-5">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#34483A]" />

        <div>
          <h3 className="text-sm font-semibold text-[#272B28]">
            Confirmação do pedido
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-[#747A74]">
            Ao confirmar, seu pedido será registrado no sistema com status
            pendente. Nenhum pagamento será solicitado neste momento.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 border-t border-[#E2E3DD] pt-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#92958F]" />

        <p className="text-xs leading-relaxed text-[#92958F]">
          Endereço de entrega e formas de pagamento ainda não estão
          disponíveis nesta versão da loja.
        </p>
      </div>
    </section>
  );
}

export default CheckoutConfirmation;
