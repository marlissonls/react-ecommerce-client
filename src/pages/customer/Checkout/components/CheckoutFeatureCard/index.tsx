
import type { ReactNode } from "react";

type CheckoutFeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  implemented?: boolean;
};

function CheckoutFeatureCard({
  title,
  description,
  icon,
  implemented = false,
}: CheckoutFeatureCardProps) {
  return (
    <section
      className={`rounded-xl border p-5 ${
        implemented
          ? "border-[#D5D8D0] bg-white"
          : "border-dashed border-[#D5D8D0] bg-[#F9F9F6]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F1EB] text-[#747A74]">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-[#272B28]">
              {title}
            </h3>

            {!implemented && (
              <span className="rounded-full bg-[#EEECE4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#92958F]">
                Em breve
              </span>
            )}
          </div>

          <p className="mt-1 text-xs leading-relaxed text-[#92958F]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CheckoutFeatureCard;
