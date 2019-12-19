import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SimpleImg } from 'react-simple-img'

const CountrySelector = () => {
  const env = process.env.NODE_ENV
  const countryBuild = process.env.GATSBY_COUNTRY_BUILD
  const {
    allContentfulCountry: { edges }
  } = useStaticQuery(graphql`
    {
      allContentfulCountry {
        edges {
          node {
            name
            market_id
            defaultLocale
            code
            domain
            image {
              file {
                url
              }
            }
          }
        }
      }
    }
  `)
  const countries = edges.filter(c => {
    console.log(
      'c :',
      c.node.defaultLocale.toLowerCase(),
      c.node.code.toLowerCase(),
      countryBuild.toLowerCase()
    )
    return (
      c.node.defaultLocale.toLowerCase().search(countryBuild.toLowerCase()) !==
      -1
    )
  })
  return (
    <div id="country-selector">
      <div className="columns">
        <div className="column is-offset-one-quarter is-half">
          <h1 className="title">Choose your country</h1>
          <p className="subtitle">
            This is a static site e-commerce demo built with{' '}
            <a href="https://www.contentful.com/">Contentful</a>,{' '}
            <a href="https://www.gatsbyjs.org/">Gatsby</a>, and{' '}
            <a href="https://commercelayer.io/">Commerce Layer</a>. To get
            started, choose a shipping country below. Each country has a
            dedicated catalog, price list, and inventory model.
          </p>
          <div className="columns is-multiline">
            {countries.map((c, i: number) => {
              const href =
                env !== 'development'
                  ? `${
                      c.node.domain
                    }/${c.node.code.toLowerCase()}/${c.node.defaultLocale.toLowerCase()}`
                  : `/${c.node.code.toLowerCase()}/${c.node.defaultLocale.toLowerCase()}`
              return (
                <div key={i} className="column is-one-quarter">
                  <div className="box">
                    <a title={c.node.name} href={href}>
                      <SimpleImg
                        src={`${c.node.image.file.url}?fm=jpg&q=70`}
                        alt={c.node.name}
                        className="image"
                        sizes="556"
                        height="250"
                      />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountrySelector
