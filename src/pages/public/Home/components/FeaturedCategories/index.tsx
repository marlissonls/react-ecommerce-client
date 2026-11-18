import type { CategoryPublicView } from "@/types/category";

type FeaturedCategoriesProps = {
  categories: CategoryPublicView[];
  loading?: boolean;
};

function FeaturedCategories({
  categories,
  loading = false,
}: FeaturedCategoriesProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#747A74]">
            Explore
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#272B28] sm:text-3xl">
            Categorias em destaque
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-xl bg-[#F3F1EA]"
            />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="text-sm text-[#747A74]">
          Nenhuma categoria disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-xl border border-[#E2E3DD] bg-[#F3F1EA] p-5 transition-colors hover:bg-[#EAE9E0]"
            >
              <span className="text-xs font-medium text-[#747A74]">
                0{index + 1}
              </span>

              <div>
                <h3 className="text-lg font-semibold text-[#272B28]">
                  {category.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#747A74]">
                  {category.description}
                </p>
              </div>

              <span className="absolute -right-5 -top-8 h-24 w-24 rounded-full border border-[#34483A]/10 transition-transform group-hover:scale-125" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedCategories;