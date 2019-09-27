import React from 'react'
import { Link } from 'gatsby'

interface BreadcrumbProps {
  categoryName?: string
  shop: string
  lang: string
  uri: string
}

const Breadcrumb = (props: BreadcrumbProps) => {
  console.log('props :', props)
  const { categoryName, shop, lang, uri } = props
  const label = lang === 'it' ? 'Categorie' : 'Categories'
  const active =
    uri.search(`/${shop}/${lang}${categoryName && `/${categoryName}`}`) !== -1
      ? 'is-active'
      : ''
  console.log('active :', active)
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className={active}>
          <Link to={`/${shop}/${lang}`}>{label}</Link>
        </li>
        {categoryName && (
          <li className={active}>
            <Link
              style={{ textTransform: 'capitalize' }}
              to={`/${categoryName.toLowerCase()}`}
            >
              {categoryName}
            </Link>
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
