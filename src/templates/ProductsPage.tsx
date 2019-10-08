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
	const [ status, setStatus ] = useShoppingBag()
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
				data={data.contentfulCategory.products}
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
			contentful_id
			name
			products {
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
		}
	}
`
