import React from 'react'
import Layout from '../../../components/Layout'
import Breadcrumb from '../../../components/Breadcrumb'
import Categories from '../../../components/Categories'

const CategoryPage = props => {
  const { uri } = props
  const pathname = uri.split('/').filter(s => s !== '')
  const shop = pathname[0]
  const lang = pathname[1]
  return (
    <Layout>
      <Breadcrumb shop={shop} lang={lang} uri={uri} />
      <Categories shop={shop} lang={lang} />
    </Layout>
  )
}

export default CategoryPage
