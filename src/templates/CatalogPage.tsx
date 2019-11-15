import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Categories from '../components/Categories'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import useShoppingBag from '../hooks'
import SEO from '../components/seo'

export default props => {
	const { pageContext: { language, shipping, slug, pageTitle }, data } = props
	const [ status, setStatus ] = useShoppingBag()
	return (
		<Layout
			{...props}
			shoppingBagStatus={status}
			setShoppingBagStatus={setStatus}
		>
			<SEO title={pageTitle} />
			<Breadcrumb shop={shipping.toLowerCase()} lang={language} uri={slug} />
			<Categories
				shop={shipping.toLowerCase()}
				lang={language.toLowerCase()}
				data={data.contentfulCountry.catalogue.categories}
			/>
		</Layout>
	)
}

export const query = graphql`
	query Catalogue($shipping: String, $language: String) {
		contentfulCountry(node_locale: { eq: $language }, code: { eq: $shipping }) {
			node_locale
			code
			catalogue {
				categories {
					name
					node_locale
					image {
						file {
							url
						}
					}
					contentful_id
				}
			}
		}
	}
`
