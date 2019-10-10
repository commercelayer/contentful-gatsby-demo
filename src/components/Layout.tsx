import React from 'react'
import PropTypes from 'prop-types'
import * as CLayer from 'commercelayer-react'
import Header from './Header'
import Footer from './Footer'
import 'bulma'
import '../stylesheets/main.css'
import ShoppingBag from './ShoppingBag'

const Layout = ({
	children,
	location,
	shoppingBagStatus,
	setShoppingBagStatus,
	...props
}) => {
	const { pageContext: { shipping, language } } = props
	const marketId = shipping === 'US' ? '76' : '75'
	const sectionOpacity = shoppingBagStatus ? 'open' : ''
	return (
		<React.Fragment>
			<Header
				shipping={shipping}
				lang={language}
				shoppingBagPreviewProps={{
					onClick: setShoppingBagStatus
				}}
			/>
			<section id='main' className={`section ${sectionOpacity}`}>
				<div className='container'>{children}</div>
			</section>
			<Footer />
			<ShoppingBag
				lang={language}
				open={shoppingBagStatus}
				close={setShoppingBagStatus}
			/>
			<CLayer.Config
				baseUrl='https://contentful-commerce.commercelayer.io'
				clientId='183336e806fd8d1389504b6fda842195bf50fee8fa62ccb52e1b19785f825314'
				marketId={marketId}
				countryCode={shipping ? shipping.toUpperCase() : 'US'}
				languageCode='en'
				cartUrl='https://contentful-gatsby-demo.netlify.com/'
				returnUrl='https://contentful-gatsby-demo.netlify.com/'
				privacyUrl='https://contentful-gatsby-demo.netlify.com/'
				termsUrl='https://contentful-gatsby-demo.netlify.com/'
			/>
		</React.Fragment>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

Layout.defaultProps = {
	location: {
		pathname: ''
	}
}

export default Layout
