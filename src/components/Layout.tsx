import React from 'react'
import PropTypes from 'prop-types'
import * as CLayer from 'commercelayer-react'

import Header from './Header'
import Footer from './Footer'
import 'bulma'
import '../stylesheets/main.css'
import ShoppingBag from './ShoppingBag'

const Layout = ({ children, location, ...props }) => {
	const [ shoppingBagOpen, setShoppingBagOpen ] = React.useState(false)
	React.useEffect(() => {
		if (document) {
			document
				.getElementsByTagName('html')[0]
				.setAttribute('class', 'has-navbar-fixed-top')
		}
	}, [])
	const pathname = location.pathname.split('/').filter(s => s !== '')
	const shipping = pathname[0]
	const lang = pathname[1]
	const marketId = shipping === 'us' ? 76 : 75
	const handleShoppingBag = () => setShoppingBagOpen(!shoppingBagOpen)
	return (
		<React.Fragment>
			<Header
				shipping={shipping}
				lang={lang}
				shoppingBagPreviewProps={{ onClick: handleShoppingBag }}
			/>
			<section id='main' className='section'>
				<div className='container'>{children}</div>
			</section>
			<Footer />
			<ShoppingBag open={shoppingBagOpen} close={handleShoppingBag} />
			<CLayer.Config
				baseUrl='https://contentful-commerce.commercelayer.io'
				clientId='183336e806fd8d1389504b6fda842195bf50fee8fa62ccb52e1b19785f825314'
				marketId={marketId}
				countryCode={shipping ? shipping.toUpperCase() : 'US'}
				languageCode='en'
				cartUrl='https://contentful-commerce.netlify.com/'
				returnUrl='https://contentful-commerce.netlify.com/'
				privacyUrl='https://contentful-commerce.netlify.com/'
				termsUrl='https://contentful-commerce.netlify.com/'
			/>
		</React.Fragment>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

Layout.defaultProps = {
	location: {
		pathname: '',
		state: {
			marketId: '76'
		}
	}
}

export default Layout
