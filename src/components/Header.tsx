import React, { useState } from 'react'
import cgcLogo from '../images/CGC-white.svg'
import CountrySelectorNav from './CountrySelectorNav'
import LanguageSelector from './LanguageSelector'
import ShoppingBagPreview from './ShoppingBagPreview'

const Header = ({ shipping, lang, shoppingBagPreviewProps: { onClick } }) => {
  // const { onClick } = shoppingBagPreviewProps
  const env = process.env.NODE_ENV
  const [isActive, setActiveBurger] = useState(false)
  const active = isActive ? 'is-active' : ''
  const main =
    env !== 'production' ? '/' : 'https://contentful-gatsby-demo.netlify.com/'
  const handleActive = () => setActiveBurger(!isActive)
  const handleShoppingBag = () => {
    onClick()
    handleActive()
  }
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
          {shipping && (
            <a
              role="button"
              className={`navbar-burger ${active}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={handleActive}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          )}
        </div>
        <div className={`navbar-menu ${active}`}>
          <div className="navbar-end">
            {shipping && <CountrySelectorNav shipping={shipping} lang={lang} />}
            {shipping && <LanguageSelector shipping={shipping} lang={lang} />}
            {shipping && <ShoppingBagPreview onClick={handleShoppingBag} />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
