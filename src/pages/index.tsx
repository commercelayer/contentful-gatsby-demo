import React from 'react'
import Layout from '../components/Layout'
import CountrySelector from '../components/CountrySelector'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CountrySelector />
  </Layout>
)

export default IndexPage
