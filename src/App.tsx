function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold tracking-tight">
            EQUIP<span className="text-emerald-600">.</span>
          </a>

          <span className="text-sm text-slate-500">
            Loja em construção
          </span>
        </div>
      </header>

      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-6 py-20">
        <span className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Equipamentos · Performance · Estilo
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Preparado para o próximo nível.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Estamos construindo uma nova experiência de compra de equipamentos,
          com uma identidade urbana, moderna e funcional.
        </p>
      </section>
    </main>
  );
}

export default App
