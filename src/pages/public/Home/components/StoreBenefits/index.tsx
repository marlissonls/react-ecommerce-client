const benefits = [
  {
    number: "01",
    title: "Compra segura",
    description: "Seus dados protegidos em todas as etapas da compra.",
  },
  {
    number: "02",
    title: "Pagamento facilitado",
    description: "Condições práticas para você comprar com tranquilidade.",
  },
  {
    number: "03",
    title: "Produtos selecionados",
    description: "Equipamentos funcionais para diferentes necessidades.",
  },
  {
    number: "04",
    title: "Suporte especializado",
    description: "Atendimento para ajudar você a escolher seus equipamentos.",
  },
];

function StoreBenefits() {
  return (
    <section className="border-y border-[#E2E3DD] bg-[#FCFCFA] py-14 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#747A74]">
            Por que comprar na Urbana?
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#272B28] sm:text-3xl">
            Uma experiência de compra feita para você.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.number}>
              <span className="text-xs font-semibold tracking-widest text-[#34483A]">
                {benefit.number}
              </span>

              <h3 className="mt-4 text-base font-semibold text-[#272B28]">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#747A74]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoreBenefits;