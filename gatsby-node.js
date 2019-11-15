/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Catalogue
  const result = await graphql(`
    query {
			allContentfulCountry {
				edges {
					node {
						node_locale
						code
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
							}
						}
					}
				}
			}
		}
  `)

  result.data.allContentfulCountry.edges.forEach(({ node }) => {
    // Catalogue page
    createPage({
      path: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/`,
      component: path.resolve(`./src/templates/CatalogPage.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/`,
        language: node.node_locale,
        shipping: node.code,
        pageTitle: node.node_locale === 'it' ? 'Categorie' : 'Categories'
      }
    })
    node.catalogue.categories.map(c => {
      const categorySlug = c.name
        .trim()
        .toLowerCase()
        .replace(' & ', ' ')
        .replace(/\s/gm, '-')
      // Category page
      createPage({
        path: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}`,
        component: path.resolve(`./src/templates/CategoryPage.tsx`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}`,
          language: node.node_locale,
          shipping: node.code,
          categoryId: c.contentful_id,
          categorySlug,
          pageTitle: c.name.trim()
        }
      })
      c.products.map(p => {
        const productSlug = p.name.trim().toLowerCase().replace(/\s/gm, '-')
        // Product
        createPage({
          path: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}/${productSlug}`,
          component: path.resolve(`./src/templates/ProductPage.tsx`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}/${productSlug}`,
            language: node.node_locale,
            shipping: node.code,
            categoryId: c.contentful_id,
            categorySlug,
            categoryName: c.name.trim(),
            productId: p.contentful_id,
            pageTitle: p.name.trim()
          }
        })
      })
    })
  })
}
