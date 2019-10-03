import React from 'react'
import Breadcrumb from '../../src/components/Breadcrumb'
import Categories from '../../src/components/Categories'

const CategoriesPage = props => {
	const { uri, locale } = props
	React.useEffect(
		() => {
			if (window.commercelayer) {
				window.location.reload()
			}
		},
		[ window.commercelayer ]
	)
	const pathname = uri.split('/').filter(s => s !== '')
	const shop = pathname[0]
	const lang = locale
	return (
		<React.Fragment>
			<Breadcrumb shop={shop} lang={lang} uri={uri} />
			<Categories shop={shop} lang={lang} />
		</React.Fragment>
	)
}

export default CategoriesPage
