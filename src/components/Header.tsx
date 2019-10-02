import { Link } from 'gatsby'
import React from 'react'
import clImg from '../images/commercelayer_logo_white.svg'
import contentfulImg from '../images/contentful.svg'
import gatsbyImg from '../images/gatsby.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CountrySelectorNav from './CountrySelectorNav'
import LanguageSelector from './LanguageSelector'
import ShoppingBagPreview from './ShoppingBagPreview'

const Header = ({ shipping, lang, shoppingBagPreviewProps }) => (
	<nav className='navbar is-dark is-fixed-top'>
		<div className='container'>
			<div className='navbar-brand'>
				<Link to='/' className='navbar-item'>
					<img src={contentfulImg} alt='Contentful' id='contentful-logo' />
					<span className='icon'>
						{' '}
						<FontAwesomeIcon icon={faPlus} />{' '}
					</span>
					<img src={gatsbyImg} alt='Gatsby' id='gatsby-logo' />
					<span className='icon'>
						{' '}
						<FontAwesomeIcon icon={faPlus} />{' '}
					</span>
					<img src={clImg} alt='Commerce Layer' id='commercelayer-logo' />
				</Link>
			</div>
			<div className='navbar-menu'>
				<div className='navbar-end'>
					{shipping && <CountrySelectorNav shipping={shipping} lang={lang} />}
					{shipping && <LanguageSelector shipping={shipping} lang={lang} />}
					{shipping && <ShoppingBagPreview {...shoppingBagPreviewProps} />}
				</div>
			</div>
		</div>
	</nav>
)

export default Header
