export interface BaseComponent {
  shop: string
  lang: string
  uri?: string
}

export interface BreadcrumbProps extends BaseComponent {
  productSlug?: string
  categorySlug?: string
  categoryName?: string
  uri: string
}

export interface ProductsProps extends BaseComponent {
  data: any[],
  categorySlug: string
}

export interface ProductProps extends BaseComponent {
  data: any
  onClick: (e) => void
}

export interface HeaderProps extends BaseComponent {
  shoppingBagPreviewProps: ShoppingBagPreviewProps
}

export interface CategoriesProps extends BaseComponent {
  data: any[]
}

export interface ShoppingBagProps {
  lang: string
  open: boolean
  close?: () => void
}

export interface RouteProps {
  path: string
  component: any
}

export interface ShoppingBagPreviewProps {
  onClick?: () => void
}