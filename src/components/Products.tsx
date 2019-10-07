import React from 'react'
import { ProductsProps } from '../types/index'
import * as CLayer from 'commercelayer-react'
import { Link } from 'gatsby'

const Products = (props: ProductsProps) => {
	const { data, shop, lang, categorySlug } = props
	return (
		<div className='columns is-multiline is-mobile'>
			{data.map((p, i) => {
				const srcImg = `https:${p.image.file.url}`
				const productSlug = p.name.trim().toLowerCase().replace(/\s/gm, '-')
				return (
					<div key={i} className='column is-half-touch is-one-quarter-desktop'>
						<div className='product-listing box'>
							<Link
								to={`/${shop}/${lang}/${categorySlug}/${productSlug}`}
								state={{
									categoryId: p.contentful_id
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
