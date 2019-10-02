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
		location: { state: { reference } }
	} = props
	React.useEffect(() => {
		if (window.commercelayer) {
			console.log('----- INIT CLAYER ----')
			window.commercelayer.init()
		}
	})
	const pathname = uri.split('/').filter(s => s !== '')
	const shop = pathname[0]
	const lang = locale
	console.log('reference :', reference)
	// const categoryName = pathname[2]
	return (
		<React.Fragment>
			<Breadcrumb
				shop={shop}
				lang={lang}
				uri={uri}
				categoryName={categoryName}
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
