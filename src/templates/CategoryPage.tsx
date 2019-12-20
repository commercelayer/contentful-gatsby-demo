import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Products from '../components/Products'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import useShoppingBag from '../hooks'
import SEO from '../components/seo'

export default props => {
  const {
    pageContext: { language, shipping, slug, categorySlug, pageTitle },
    data
  } = props
  const ship = shipping.toLowerCase()
  const products =
    data.contentfulCategory[`products_${ship}`] &&
    data.contentfulCategory[`products_${ship}`].length > 0
      ? data.contentfulCategory[`products_${ship}`]
      : data.contentfulCategory.products
  const [status, setStatus] = useShoppingBag()
  return (
    <Layout
      {...props}
      shoppingBagStatus={status}
      setShoppingBagStatus={setStatus}
    >
      <SEO title={pageTitle} />
      <Breadcrumb
        shop={shipping.toLowerCase()}
        lang={language}
        uri={slug}
        categorySlug={categorySlug}
        categoryName={data.contentfulCategory.name.trim()}
      />
      <Products
        shop={shipping.toLowerCase()}
        lang={language.toLowerCase()}
        data={products}
        categorySlug={categorySlug}
      />
    </Layout>
  )
}

export const query = graphql`
  query Products($categoryId: String, $language: String) {
    contentfulCategory(
      contentful_id: { eq: $categoryId }
      node_locale: { eq: $language }
    ) {
      name
      products {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
      node_locale
      products_ca {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
      products_cn {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
      products_gb {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
      products_it {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
      products_jp {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
    }
  }
`
