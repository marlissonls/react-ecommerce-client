import { useEffect, useState } from "react";

import api from "@/api";

import type {
  ProductPublicView,
  ProductPagePublicView,
} from "@/types/product";

import type {
  CategoryPublicView,
  CategoryListPublicView,
} from "@/types/category";

import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import FeaturedProducts from "./components/FeaturedProducts";
import NewArrivals from "./components/NewArrivals";
import StoreBenefits from "./components/StoreBenefits";

function Home() {
  const [categories, setCategories] = useState<CategoryPublicView[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<ProductPublicView[]>([]);
  const [newArrivals, setNewArrivals] = useState<ProductPublicView[]>([]);

  const [loading, setLoading] = useState({
    categories: true,
    featured: true,
    newArrivals: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadHome() {
      const [categoriesResult, featuredResult, newArrivalsResult] =
        await Promise.allSettled([
          api.get<CategoryListPublicView>("/categories", {
            params: { page: 0, size: 8 },
            signal: controller.signal,
          }),
          api.get<ProductPagePublicView>("/products", {
            params: { page: 0, size: 8, featured: true },
            signal: controller.signal,
          }),
          api.get<ProductPagePublicView>("/products", {
            params: { page: 0, size: 8, isNew: true },
            signal: controller.signal,
          }),
        ]);
      
      if (controller.signal.aborted) return;
      
      if (categoriesResult.status === "fulfilled") {
        setCategories(categoriesResult.value.data);
      }
      
      if (featuredResult.status === "fulfilled") {
        setFeaturedProducts(featuredResult.value.data.items);
      }
      
      if (newArrivalsResult.status === "fulfilled") {
        setNewArrivals(newArrivalsResult.value.data.items);
      }

      setLoading({
        categories: false,
        featured: false,
        newArrivals: false,
      });
    }

    loadHome();

    return () => controller.abort();
  }, []);

  return (
    <>
      <Hero />

      <FeaturedCategories
        categories={categories}
        loading={loading.categories}
      />

      <FeaturedProducts
        products={featuredProducts}
        loading={loading.featured}
      />

      <NewArrivals
        products={newArrivals}
        loading={loading.newArrivals}
      />

      <StoreBenefits />
    </>
  );
}

export default Home;