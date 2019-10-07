import React from 'react'
import { ProductProps } from '../types/index'
import * as CLayer from 'commercelayer-react'
import locale from '../locale/locale.json'

const Product = (props: ProductProps) => {
	const { lang, data } = props
	const variants = data.variants.map(v => {
		return {
			code: v.code,
			name: v.name,
			label: v.size.name
		}
	})
	return (
		<div className='columns'>
			<div className='column is-two-thirds'>
				<img src={data.image.file.url} alt={data.name} />
			</div>
			<div className='column'>
				<h1 className='title'>{data.name}</h1>

				<CLayer.Price skuCode={data.variants[0].code} />

				<div className='select is-fullwidth variant-select-wrap'>
					<CLayer.VariantSelect
						className='variant-select'
						PriceContainerId='price'
						AvailabilityMessageContainerId='availability-message'
						AddToBagId='add-to-bag'
						promptText={locale[lang].select_size}
						skus={variants}
					/>
				</div>
				<CLayer.AddToBag
					className='add-to-bag button is-success is-fullwidth'
					id='add-to-bag'
					AvailabilityMessageContainerId='availability-message'
					text={locale[lang].add_to_bag}
				/>

				<CLayer.AvailabilityMessageContainer id='availability-message' />

				<CLayer.AvailabilityMessageAvailableTemplate
					className='available-message has-text-success'
					availableTemplate={
						<p className='has-text-success'>
							<span className='is-capitalized'>
								{locale[lang].available}
							</span>{' '}
							in{' '}
							<CLayer.AvailabilityMessageMinDays className='available-message-min-days' />-<CLayer.AvailabilityMessageMaxDays className='available-message-max-days' />{' '}
							{locale[lang].days}
						</p>
					}
				/>
				<CLayer.AvailabilityMessageUnavailableTemplate
					className='unavailable-message has-text-danger'
					unavailableTemplate={<p>{locale[lang].not_available}</p>}
				/>
			</div>
		</div>
	)
}

export default Product
