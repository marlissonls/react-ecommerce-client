function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#202B24] text-[#FCFCFA]">
      <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10 sm:h-[500px] sm:w-[500px]" />

      <div className="absolute -right-8 -top-12 h-64 w-64 rounded-full border border-white/10 sm:h-[400px] sm:w-[400px]" />

      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div className="relative z-10 max-w-xl">
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#B5C3B5]">
            Urbana · Tática · Outdoor
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Equipamentos para quem está sempre em movimento.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Encontre equipamentos funcionais, produtos táticos e
            acessórios outdoor para acompanhar sua rotina e suas
            aventuras.
          </p>

          <a
            href="#featured-products"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-[#34483A] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#405847] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explorar produtos
          </a>
        </div>

        <div className="relative hidden aspect-square items-center justify-center lg:flex">
          <div className="absolute h-[85%] w-[85%] rotate-12 rounded-[40px] border border-white/10 bg-white/[0.03]" />
          <div className="absolute h-[65%] w-[65%] -rotate-6 rounded-[32px] border border-white/10" />

          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/20 bg-white/[0.04]">
            <span className="text-6xl font-bold tracking-tighter text-white/80">
              U.
            </span>
          </div>

          <span className="absolute bottom-8 right-0 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Urbana Equipment
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;