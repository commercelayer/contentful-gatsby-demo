import React from 'react'
import Breadcrumb from '../../src/components/Breadcrumb'
import Categories from '../../src/components/Categories'

const CategoriesPage = props => {
  console.log('props :', props)
  const {uri, locale} = props
  const pathname = uri
    .split('/')
    .filter(s => s !== '')
  const shop = pathname[0]
  const lang = locale
  return (
    <React.Fragment>
      <Breadcrumb shop={shop} lang={lang} uri={uri}/>
      <Categories shop={shop} lang={lang}/>
    </React.Fragment>
  )
}

export default CategoriesPage
