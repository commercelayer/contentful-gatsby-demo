export interface BaseComponent {
  shop: string
  lang: string
  uri?: string
}

export interface BreadcrumbProps extends BaseComponent {
  productSlug?: string
  categoryName?: string
  uri: string
}

export interface ProductsProps extends BaseComponent {
  categoryId: string
  categoryName?: string
}

export interface ProductProps extends BaseComponent {
  categoryName?: string
  reference: string
}

export interface HeaderProps extends BaseComponent {
  shoppingBagPreviewProps: ShoppingBagPreviewProps
}

export interface ShoppingBagProps {
  open?: boolean
  close?: () => void
}

export interface RouteProps {
  path: string
  component: any
}

export interface ShoppingBagPreviewProps {
  onClick?: () => void
}