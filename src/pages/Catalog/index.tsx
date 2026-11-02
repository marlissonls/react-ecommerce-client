import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"

import api from "@/api"
import type { 
  CategoryListPublicView,
  CategoryPublicView,
  BrandListPublicView,
  ProductPublicView,
  ProductPagePublicView } from "@/types"

import Breadcrumb from "@/components/Breadcrumb"
import ProductListing from "@/components/ProductListing"
import type { ProductFiltersValue } from "@/components/ProductFilters"

const PAGE_SIZE = 12

const initialFilters: ProductFiltersValue = {
  category: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  onSale: false,
}

function Catalog() {
  const { slug } = useParams<{ slug: string }>()

  const [categories, setCategories] = useState<CategoryListPublicView>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryPublicView | null>(null)

  const [brands, setBrands] = useState<BrandListPublicView>([])
  const [products, setProducts] = useState<ProductPublicView[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [catalogLoading, setCatalogLoading] = useState(true)

  const [filters, setFilters] = useState<ProductFiltersValue>(initialFilters)
  const [sort, setSort] = useState("relevance")
  const [page, setPage] = useState(0)

  // Carrega categorias ou marcas
  useEffect(() => {
    let active = true

    async function loadCatalogItems() {
      setCatalogLoading(true)
      setSelectedCategory(null)

      try {
        const categoriesResponse = await api.get<CategoryListPublicView>("/categories")

        const brandsResponse = await api.get<BrandListPublicView>("/brands")

        if (!active) return

        setCategories(categoriesResponse.data)

        setBrands(brandsResponse.data)

        const category = categoriesResponse.data.find((entry) => entry.slug === slug)

        setSelectedCategory(category ?? null)

        setFilters({
          ...initialFilters,
          category: category?.id ?? "",
        })

        setPage(0)
        setSort("relevance")
      } catch (error) {
        console.error("Erro ao carregar catálogo", error)

        if (active) {
          setCategories([])
          setSelectedCategory(null)
        }
      } finally {
        if (active) {
          setCatalogLoading(false)
        }
      }
    }

    loadCatalogItems()

    return () => {
      active = false
    }
  }, [slug])

  // Carrega produtos conforme o contexto e os filtros
  useEffect(() => {
    if (catalogLoading) return

    if (!selectedCategory) {
      setProducts([])
      setTotal(0)
      setLoading(false)
      return
    }

    let active = true

    async function loadProducts() {
      setLoading(true)

      try {
        const params = {
          page,
          size: PAGE_SIZE,
          ...(filters.category && { category: filters.category }),
          ...(filters.brand && { brand: filters.brand }),
          ...(filters.minPrice && { minPrice: filters.minPrice }),
          ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
          ...(filters.onSale && { onSale: true }),
        }

        const response = await api.get<ProductPagePublicView>("/products", {
          params,
        })

        if (!active) return

        setProducts(response.data.items)
        setTotal(response.data.total)
      } catch (error) {
        console.error("Erro ao carregar produtos", error)

        if (active) {
          setProducts([])
          setTotal(0)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [catalogLoading, selectedCategory, filters, page])

  // Ordenação local por preço
  const sortedProducts = useMemo(() => {
    const result = [...products]

    if (sort === "price-asc") {
      return result.sort((a, b) => a.price - b.price)
    }

    if (sort === "price-desc") {
      return result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, sort])

  function handleFiltersChange(newFilters: ProductFiltersValue) {
    setFilters({
      ...newFilters,
      category: selectedCategory?.id ?? "",
    })

    setPage(0)
  }

  function handleResetFilters() {
    setFilters({
      ...initialFilters,
      category: selectedCategory?.id ?? "",
    })

    setSort("relevance")
    setPage(0)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  if (!catalogLoading && !selectedCategory) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-[#272B28]">
          Categoria não encontrada
        </h1>

        <p className="mt-2 text-sm text-[#747A74]">
          Não encontramos a categoria solicitada.
        </p>
      </main>
    )
  }

  return (
    <main className="bg-[#FCFCFA]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Categorias", href: "/category", },
            { label: selectedCategory?.title ?? "Carregando..." },
          ]}
        />

        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#747A74]">
            Explore nossas categorias
          </span>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#272B28] sm:text-3xl">
            {selectedCategory?.title ?? "Carregando categoria..."}
          </h1>

          {selectedCategory?.description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#747A74]">
              {selectedCategory.description}
            </p>
          )}
        </div>

        <ProductListing
          products={sortedProducts}
          loading={loading || catalogLoading}
          categories={categories.map(({ id, title }) => ({ id, title }))}
          brands={brands.map(({ id, title }) => ({ id, title }))}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
          sort={sort}
          onSortChange={setSort}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          showCategoryFilter={false}
        />
      </div>
    </main>
  )
}

export default Catalog
