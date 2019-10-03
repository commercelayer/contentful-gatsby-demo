import React from 'react'
import { ProductsProps } from '../types/index'
import * as CLayer from 'commercelayer-react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import locale from '../locale/locale.json'

const Products = (props: ProductsProps) => {
	const { categoryName, categoryId, shop, lang } = props
	const { allContentfulCategory: { edges } } = useStaticQuery(graphql`
		{
			allContentfulCategory {
				edges {
					node {
						name
						node_locale
						contentful_id
						products {
							node_locale
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
			}
		}
	`)
	const category = edges.filter(({ node }) => {
		return (
			(node.contentful_id === categoryId &&
				node.node_locale.toLowerCase() === lang) ||
			(node.node_locale.toLowerCase() === lang &&
				node.name.toLowerCase() === categoryName)
		)
	})[0].node
	// const [ loadData, setLoadData ] = React.useState(false) React.useEffect( 	()
	// => { 		if (window.commercelayer) { 			window.commercelayer.init() 		} 	}, 	[
	// loadData ] ) if (data && !loadData) { 	setLoadData(true) }
	return (
		<div className='columns is-multiline is-mobile'>
			{category.products.map((p, i) => {
				const srcImg = `https:${p.image.file.url}`
				const productSlug = p.name.trim().toLowerCase().replace(/\s/gm, '-')
				return (
					<div key={i} className='column is-half-touch is-one-quarter-desktop'>
						<div className='product-listing box'>
							<Link
								to={`/${shop}/${lang}/${categoryName}/${productSlug}`}
								state={{
									reference: p.reference
								}}
							>
								<img src={srcImg} alt={p.name} />
							</Link>
							<h2 className='has-text-weight-bold is-hidden-mobile'>
								{p.name}
							</h2>
							<div className='is-size-7 is-hidden-mobile'>{p.reference}</div>
							<CLayer.Price skuCode={p.variants[0].code} />
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Products
