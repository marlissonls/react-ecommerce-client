import type { PageResponse } from "./pagination"

export type BrandPublicView = {
  id: string,
  title: string,
  slug: string,
  description: string,
  createdAt: Date
}

export type BrandPagePublicView = PageResponse<BrandPublicView>