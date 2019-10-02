import React from 'react'
import Breadcrumb from './Breadcrumb'
import Products from './Products'

const ProductsPage = props => {
	const { uri, locale, categoryName } = props
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
			/>
			<Products shop={shop} lang={lang} categoryName={categoryName} />
		</React.Fragment>
	)
}

export default ProductsPage
