import React from 'react'
import Layout from '../components/Layout'
import CountrySelector from '../components/CountrySelector'
import SEO from '../components/seo'

const IndexPage = props => (
  <Layout {...props}>
    <SEO title="Home" />
    <CountrySelector />
  </Layout>
)

export default IndexPage
