import React from 'react'
import Breadcrumb from './Breadcrumb'
import Products from './Products'

const ProductsPage = props => {
	const {
		uri,
		locale,
		categoryName,
		location: { state: { categoryId } }
	} = props
	const pathname = uri.split('/').filter(s => s !== '')
	const shop = pathname[0]
	const lang = locale
	React.useEffect(
		() => {
			if (window.commercelayer) {
				window.commercelayer.init()
				console.log('=== INIT COMMERCELAYER ====')
			}
		},
		[ window.commercelayer ]
	)
	console.log('props :', props)
	return (
		<React.Fragment>
			<Breadcrumb
				shop={shop}
				lang={lang}
				uri={uri}
				categoryName={categoryName}
			/>
			<Products
				shop={shop}
				lang={lang}
				categoryId={categoryId}
				categoryName={categoryName}
			/>
		</React.Fragment>
	)
}

export default ProductsPage
