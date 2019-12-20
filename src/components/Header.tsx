import { Link } from 'gatsby'
import React from 'react'
import cgcLogo from '../images/CGC-white.svg'
import CountrySelectorNav from './CountrySelectorNav'
import LanguageSelector from './LanguageSelector'
import ShoppingBagPreview from './ShoppingBagPreview'

const Header = ({ shipping, lang, shoppingBagPreviewProps }) => {
  const ship = shipping?.toLowerCase()
  const main =
    typeof window !== 'undefined' ? window.origin.replace(`-${ship}`, '') : '/'
  return (
    <nav className="navbar is-dark is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <Link to={main} className="navbar-item">
            <img
              src={cgcLogo}
              alt="Contentful + Gatsby + Commerce Layer"
              width="122"
            />
          </Link>
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
