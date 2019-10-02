import React from 'react'
import { ProductProps } from '../types/index'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import * as CLayer from 'commercelayer-react'

const Product = (props: ProductProps) => {
	const { reference } = props
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
		query MyQuery($reference: String) {
			contentfulProduct(reference: { eq: $reference }) {
				reference
				name
				variants {
					name
					code
					size {
						name
					}
				}
				image {
					file {
						url
					}
				}
			}
		}
	`
	const { loading, error, data } = useQuery(query, {
		variables: {
			reference
		}
	})
	if (loading) return <div>Loading...</div>
	if (error) return <div>Ops! There is an error...</div>
	const p = data.contentfulProduct
	const variants = p.variants.map(v => {
		return {
			code: v.code,
			name: v.name,
			label: v.size.name
		}
	})
	if (data && !loadData) {
		setLoadData(true)
	}
	return (
		<div className='columns'>
			<div className='column is-two-thirds'>
				<img src={p.image.file.url} alt={p.name} />
			</div>
			<div className='column'>
				<h1 className='title'>{p.name}</h1>

				<CLayer.Price skuCode={p.variants[0].code} />

				<div className='select is-fullwidth variant-select-wrap'>
					<CLayer.VariantSelect
						className='variant-select'
						PriceContainerId='price'
						AvailabilityMessageContainerId='availability-message'
						AddToBagId='add-to-bag'
						skus={variants}
					/>
				</div>
				<CLayer.AddToBag
					className='add-to-bag button is-success is-fullwidth'
					id='add-to-bag'
					AvailabilityMessageContainerId='availability-message'
				/>

				<CLayer.AvailabilityMessageContainer id='availability-message' />

				<CLayer.AvailabilityMessageAvailableTemplate
					className='available-message has-text-success'
					availableTemplate={
						<p>
							Available in{' '}
							<CLayer.AvailabilityMessageMinDays className='available-message-min-days' />-<CLayer.AvailabilityMessageMaxDays className='available-message-max-days' />{' '}
							days with <CLayer.AvailabilityMessageShippingMethodName /> (<CLayer.AvailabilityMessageShippingMethodPrice />)
						</p>
					}
				/>
				<CLayer.AvailabilityMessageUnavailableTemplate
					className='unavailable-message has-text-danger'
					unavailableTemplate={<p>Not Available</p>}
				/>
				{/* <a
					href='#'
					className='add-to-bag button is-success is-fullwidth'
					data-product-name={`{ page.product.name }`}
					data-sku-image-Url={`{ page.product.image.url }`}
				>
					site.t[page.locale]['add_to_bag']
				</a>

				<div className='available-message has-text-success'>
					site.t[page.locale]['available'] | capitalize
					<span className='available-message-min-days' />-<span className='available-message-max-days' />
					site.t[page.locale]['days']
				</div>

				<div className='unavailable-message has-text-danger'>
					site.t[page.locale]['out_of_stock']
				</div> */}
			</div>
		</div>
	)
}

export default Product
