// import { Link } from "gatsby"
import PropTypes from 'prop-types'
import React from 'react'
import clImg from '../images/commercelayer_logo_white.svg'
import contentfulImg from '../images/contentful.svg'
import gatsbyImg from '../images/gatsby.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const Header = () => (
  <nav className="navbar is-dark is-fixed-top">
    <div className="container">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          <img src={gatsbyImg} alt="Gatsby" id="gatsby-logo" />
          <span className="icon">
            {' '}
            <FontAwesomeIcon icon={faPlus} />{' '}
          </span>
          <img src={contentfulImg} alt="Contentful" id="contentful-logo" />
          <span className="icon">
            {' '}
            <FontAwesomeIcon icon={faPlus} />{' '}
          </span>
          <img src={clImg} alt="Commerce Layer" id="commercelayer-logo" />
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end"></div>
      </div>
    </div>
  </nav>
)

export default Header
