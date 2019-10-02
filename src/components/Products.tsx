import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { capitalizeFirstLetter } from '../helpers/index'
import { ProductsProps } from '../types/index'
import * as CLayer from 'commercelayer-react'
import { Link } from 'gatsby'

const Products = (props: ProductsProps) => {
	const { categoryName, shop, lang } = props
	const [ loadData, setLoadData ] = React.useState(false)
	React.useEffect(
		() => {
			if (window.commercelayer) {
				window.commercelayer.init()
			}
		},
		[ loadData ]
	)
	const query = gql`
		query MyQuery($category: String) {
			allContentfulProduct(
				filter: { category: { elemMatch: { name: { eq: $category } } } }
			) {
				nodes {
					name
					reference
					category {
						name
						node_locale
					}
					image {
						file {
							url
						}
					}
					variants {
						code
					}
				}
			}
		}
	`
	const { loading, error, data } = useQuery(query, {
		variables: {
			category: capitalizeFirstLetter(categoryName)
		}
	})
	if (loading) return <div>Loading...</div>
	if (error) return <div>Ops! There is an error...</div>
	if (data && !loadData) {
		setLoadData(true)
	}
	return (
		<div className='columns is-multiline is-mobile'>
			{data.allContentfulProduct.nodes.map((p, i) => {
				const srcImg = `https:${p.image.file.url}`
				const productSlug = p.name.trim().toLowerCase().replace(/\s/gm, '-')
				return (
					<div key={i} className='column is-half-touch is-one-quarter-desktop'>
						<div className='product-listing box'>
							<Link
								to={`/${shop}/${lang}/${categoryName}/${productSlug}`}
								state={{ reference: p.reference }}
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
