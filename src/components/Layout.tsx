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
	const marketId = shipping === 'US' ? '1510' : '1509'
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
				baseUrl='https://marvel.commercelayer.io'
				clientId='709d8d691e2dd17a1a4ea7dd4658d811e4c1bac2bf50186c70ab52a904029435'
				marketId={marketId}
				countryCode={shipping ? shipping.toUpperCase() : 'US'}
				languageCode={
					language ? language.toLowerCase().replace('-us', '') : 'en'
				}
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
