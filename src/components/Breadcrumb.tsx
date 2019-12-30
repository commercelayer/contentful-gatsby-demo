import React from 'react'
import { Link } from 'gatsby'
import { BreadcrumbProps } from '../types/index'
import locale from '../locale/locale.json'

const Breadcrumb = (props: BreadcrumbProps) => {
  const { categorySlug, shop, lang, productSlug, categoryName } = props
  const env = process.env.NODE_ENV
  const main =
    env !== 'production' ? '/' : 'https://contentful-gatsby-demo.netlify.com/'
  const catalogLink =
    env !== 'production'
      ? `/${shop}/${lang.toLowerCase()}`
      : `/${lang.toLowerCase()}`
  const categoryLink =
    env !== 'production'
      ? `/${shop}/${lang.toLowerCase()}/${categorySlug}`
      : `/${lang.toLowerCase()}/${categorySlug}`
  const label = locale[lang].categories
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href={main}>Home</a>
        </li>
        <li
          className={
            shop && lang && !categorySlug
              ? 'is-capitalized is-active'
              : 'is-capitalized'
          }
        >
          <Link to={catalogLink}>{label}</Link>
        </li>
        {categorySlug && (
          <li className={productSlug ? '' : 'is-active'}>
            <Link to={categoryLink}>{categoryName}</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

Breadcrumb.defaultProps = {
  categoryName: ''
}

export default Breadcrumb
