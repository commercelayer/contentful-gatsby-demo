import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

const ShoppingBagPreview = ({ onClick }) => {
  return (
    <a className="navbar-item" id="shopping-bag-toggle" onClick={onClick}>
      <span className="icon">
        <FontAwesomeIcon icon={faShoppingBag} />
      </span>
      <span
        className="clayer-shopping-bag-items-count tag is-warning is-rounded"
        id="shopping-bag-preview-count"
      >
        0
      </span>
    </a>
  )
}

export default ShoppingBagPreview
