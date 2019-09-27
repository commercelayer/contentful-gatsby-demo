import React from 'react'
import Layout from '../../../../components/Layout'
import Breadcrumb from '../../../../components/Breadcrumb'

const ProductPage = props => {
  console.log('props :', props)
  const { uri } = props
  const pathname = uri.split('/').filter(s => s !== '')
  const shop = pathname[0]
  const lang = pathname[1]
  const categoryName = pathname[2]
  return (
    <Layout>
      <Breadcrumb
        shop={shop}
        lang={lang}
        uri={uri}
        categoryName={categoryName}
      />
    </Layout>
  )
}

export default ProductPage
