import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Product from '../components/Product'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export default props => {
	const {
		pageContext: { language, shipping, slug, categorySlug, categoryName },
		data
	} = props
	return (
		<Layout {...props}>
			<Breadcrumb
				shop={shipping.toLowerCase()}
				lang={language}
				uri={slug}
				categorySlug={categorySlug}
				categoryName={categoryName}
				productSlug={data.contentfulProduct.name}
			/>
			<Product
				shop={shipping.toLowerCase()}
				lang={language}
				data={data.contentfulProduct}
			/>
		</Layout>
	)
}

export const query = graphql`
	query Product($productId: String) {
		contentfulProduct(contentful_id: { eq: $productId }) {
			name
			image {
				file {
					url
				}
			}
			reference
			variants {
				size {
					name
				}
				name
				code
			}
		}
	}
`
