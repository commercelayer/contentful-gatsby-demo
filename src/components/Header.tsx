import { Link } from 'gatsby'
import React from 'react'
import cgcLogo from '../images/CGC-white.svg'
import CountrySelectorNav from './CountrySelectorNav'
import LanguageSelector from './LanguageSelector'
import ShoppingBagPreview from './ShoppingBagPreview'

const Header = ({ shipping, lang, shoppingBagPreviewProps }) => {
  const main = 'https://contentful-gatsby-demo.netlify.com/'
  return (
    <nav className="navbar is-dark is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <a href={main} className="navbar-item">
            <img
              src={cgcLogo}
              alt="Contentful + Gatsby + Commerce Layer"
              width="122"
            />
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            {shipping && <CountrySelectorNav shipping={shipping} lang={lang} />}
            {shipping && <LanguageSelector shipping={shipping} lang={lang} />}
            {shipping && <ShoppingBagPreview {...shoppingBagPreviewProps} />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
