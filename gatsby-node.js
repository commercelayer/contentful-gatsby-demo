/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const countryBuild = process.env.GATSBY_COUNTRY_BUILD
  const languagesBuild = process.env.GATSBY_COUNTRY_LANGUAGES
  console.log('Build by Country: ', countryBuild)
  console.log('Languages: ', languagesBuild)
  const env = process.env.NODE_ENV
  const { createPage } = actions
  if (countryBuild === 'none') return null
  // Catalogue
  const result = await graphql(`
    query {
      allContentfulCountry {
        edges {
          node {
            node_locale
            code
            market_id
            catalogue {
              name
              node_locale
              categories {
                name
                products {
                  name
                  contentful_id
                }
                contentful_id
                products_ca {
                  name
                  contentful_id
                }
                products_cn {
                  name
                  contentful_id
                }
                products_gb {
                  name
                  contentful_id
                }
                products_it {
                  name
                  contentful_id
                }
                products_jp {
                  name
                  contentful_id
                }
              }
            }
          }
        }
      }
    }
  `)
  const edges =
    env !== 'production'
      ? result.data.allContentfulCountry.edges.filter(({ node }) => {
          return languagesBuild.search(node.node_locale) !== -1
        })
      : result.data.allContentfulCountry.edges.filter(({ node }) => {
          return (
            node.code === countryBuild &&
            languagesBuild.search(node.node_locale) !== -1
          )
        })
  edges.forEach(({ node }) => {
    const code = node.code.toLowerCase()
    const locale = node.node_locale.toLowerCase()
    if (languagesBuild.toLocaleLowerCase().search(locale) === -1) return null
    // Catalogue page
    const cataloguePath = `/${code}/${locale}/`
    console.log('cataloguePath :', cataloguePath)
    createPage({
      path: cataloguePath,
      component: path.resolve(`./src/templates/CatalogPage.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: cataloguePath,
        language: node.node_locale,
        shipping: node.code,
        pageTitle: node.node_locale === 'it' ? 'Categorie' : 'Categories',
        marketId: node.market_id
      }
    })
    node.catalogue.categories.map(c => {
      // Category page
      const categorySlug = c.name
        .trim()
        .toLowerCase()
        .replace(' & ', ' ')
        .replace(/\s/gm, '-')
      const categoryPath = `/${code}/${locale}/${categorySlug}`
      console.log('categoryPath :', categoryPath)
      createPage({
        path: categoryPath,
        component: path.resolve(`./src/templates/CategoryPage.tsx`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: categoryPath,
          language: node.node_locale,
          shipping: node.code,
          categoryId: c.contentful_id,
          categorySlug,
          pageTitle: c.name.trim(),
          marketId: node.market_id
        }
      })
      const products = c[`products_${code}`]
        ? c[`products_${code}`]
        : c.products
      products.map(p => {
        const productSlug = p.name
          .trim()
          .toLowerCase()
          .replace(/\s/gm, '-')
        const productPath = `/${code}/${locale}/${categorySlug}/${productSlug}`
        console.log('productPath :', productPath)
        // Product
        createPage({
          path: productPath,
          component: path.resolve(`./src/templates/ProductPage.tsx`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: productPath,
            language: node.node_locale,
            shipping: node.code,
            categoryId: c.contentful_id,
            categorySlug,
            categoryName: c.name.trim(),
            productId: p.contentful_id,
            pageTitle: p.name.trim(),
            marketId: node.market_id
          }
        })
      })
    })
  })
}
