import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router"

import api from "@/api"
import type { 
  CategoryListPublicView,
  BrandListPublicView,
  ProductPublicView,
  ProductPagePublicView } from "@/types"

import Breadcrumb from "@/components/Breadcrumb"
import ProductListing from "@/components/ProductListing"
import type { ProductFiltersValue } from "@/components/ProductFilters"

const PAGE_SIZE = 12

const initialFilters: ProductFiltersValue = {
  search: "",
  category: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  onSale: false,
}

function Catalog() {
  const [categories, setCategories] = useState<CategoryListPublicView>([])
  const [brands, setBrands] = useState<BrandListPublicView>([])
  const [products, setProducts] = useState<ProductPublicView[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [catalogLoading, setCatalogLoading] = useState(true)

  const [sort, setSort] = useState("relevance")
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState<ProductFiltersValue>(() => ({
    ...initialFilters,
    search: searchParams.get("search") ?? "",
    onSale: searchParams.get("onSale") === "true",
  }))

  // Carrega categorias ou marcas
  useEffect(() => {
    let active = true

    async function loadCatalogItems() {
      setCatalogLoading(true)
      // setSelectedCategory(null)

      try {
        const categoriesResponse = await api.get<CategoryListPublicView>("/categories")

        const brandsResponse = await api.get<BrandListPublicView>("/brands")

        if (!active) return

        setCategories(categoriesResponse.data)

        setBrands(brandsResponse.data)

        setPage(0)
        setSort("relevance")
      } catch (error) {
        console.error("Erro ao carregar catálogo", error)

        if (active) {
          setCategories([])
          setBrands([])
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
  }, [])

  // useEffect(() => {
  //   const search = searchParams.get("search") ?? ""
  
  //   setFilters((current) => {
  //     if (current.search === search) return current
  
  //     return {
  //       ...current,
  //       search,
  //     }
  //   })
  
  //   setPage(0)
  // }, [searchParams])

  useEffect(() => {
    const search = searchParams.get("search") ?? ""
    const onSale = searchParams.get("onSale") === "true"
  
    setFilters((current) => {
      if (current.search === search && current.onSale === onSale) {
        return current
      }
  
      return {
        ...current,
        search,
        onSale,
      }
    })
  
    setPage(0)
  }, [searchParams])

  // Carrega produtos conforme o contexto e os filtros
  useEffect(() => {
    if (catalogLoading) return

    let active = true

    async function loadProducts() {
      setLoading(true)

      try {
        const params = {
          page,
          size: PAGE_SIZE,
          ...(filters.search && { search: filters.search }),
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
  }, [catalogLoading, filters, page])

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

  // function handleFiltersChange(newFilters: ProductFiltersValue) {
  //   setFilters(newFilters)
  //   setPage(0)
  
  //   setSearchParams(
  //     newFilters.search
  //       ? { search: newFilters.search }
  //       : {},
  //     { replace: true },
  //   )
  // }

  function handleFiltersChange(newFilters: ProductFiltersValue) {
    setFilters(newFilters)
    setPage(0)
  
    const params = new URLSearchParams()
  
    if (newFilters.search) {
      params.set("search", newFilters.search)
    }
  
    if (newFilters.onSale) {
      params.set("onSale", "true")
    }
  
    setSearchParams(params, { replace: true })
  }

  function handleResetFilters() {
    setFilters(initialFilters)
    setSort("relevance")
    setPage(0)
    setSearchParams({}, { replace: true })
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <main className="bg-[#FCFCFA]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Catálogo", href: "/catalog", },
          ]}
        />

        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#747A74]">
            Explore nossos produtos
          </span>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#272B28] sm:text-3xl">
            Catálogo
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#747A74]">
            Todos os produtos
          </p>
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
        />
      </div>
    </main>
  )
}

export default Catalog
