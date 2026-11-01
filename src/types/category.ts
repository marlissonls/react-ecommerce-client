export type CategoryPublicView = {
  id: string,
  title: string,
  slug: string,
  description: string,
  createdAt: Date
}

export type CategoryListPublicView = CategoryPublicView[]