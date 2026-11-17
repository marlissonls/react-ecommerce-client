
const steps = [
  {
    number: "01",
    title: "Revisão",
    description: "Confira seus produtos",
    implemented: true,
  },
  {
    number: "02",
    title: "Entrega",
    description: "Endereço de entrega",
    implemented: false,
  },
  {
    number: "03",
    title: "Pagamento",
    description: "Forma de pagamento",
    implemented: false,
  },
];

function CheckoutProgress() {
  return (
    <section className="mb-10">
      <div className="flex items-start">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="flex min-w-0 flex-1 items-start"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                  step.implemented
                    ? "bg-[#34483A] text-white"
                    : "border border-[#D5D8D0] bg-[#F9F9F6] text-[#A0A49D]"
                }`}
              >
                {step.implemented ? "✓" : step.number}
              </div>

              <h3
                className={`mt-3 text-xs font-semibold ${
                  step.implemented
                    ? "text-[#34483A]"
                    : "text-[#92958F]"
                }`}
              >
                {step.title}
              </h3>

              <p className="mt-1 text-[11px] text-[#92958F]">
                {step.description}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`mt-[18px] h-px flex-1 ${
                  step.implemented
                    ? "bg-[#34483A]"
                    : "bg-[#E2E3DD]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CheckoutProgress;
