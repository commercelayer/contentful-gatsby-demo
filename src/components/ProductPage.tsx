import React from 'react'
import Breadcrumb from './Breadcrumb'
import Product from './Product'

const ProductPage = props => {
	console.log('props ProductPage :', props)
	const {
		uri,
		locale,
		categoryName,
		productSlug,
		location: { state: { reference, categoryId } }
	} = props
	const pathname = uri.split('/').filter(s => s !== '')
	const shop = pathname[0]
	const lang = locale
	return (
		<React.Fragment>
			<Breadcrumb
				shop={shop}
				lang={lang}
				uri={uri}
				categoryName={categoryName}
				categoryId={categoryId}
				productSlug={productSlug}
			/>
			<Product
				shop={shop}
				lang={lang}
				categoryName={categoryName}
				reference={reference}
			/>
		</React.Fragment>
	)
}

export default ProductPage
