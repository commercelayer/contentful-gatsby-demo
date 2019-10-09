import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Product from '../components/Product'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import useShoppingBag from '../hooks'
import SEO from '../components/seo'

export default props => {
	const {
		pageContext: {
			language,
			shipping,
			slug,
			categorySlug,
			categoryName,
			pageTitle
		},
		data
	} = props
	const [ status, setStatus ] = useShoppingBag()
	const handleOnClick = e => {
		if (e.target.hasAttribute('disabled')) {
			return e.preventDefault()
		}
		setStatus()
	}
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
				categoryName={categoryName}
				productSlug={data.contentfulProduct.name}
			/>
			<Product
				shop={shipping.toLowerCase()}
				lang={language}
				data={data.contentfulProduct}
				onClick={handleOnClick}
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
