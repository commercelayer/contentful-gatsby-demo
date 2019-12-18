import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import locale from '../locale/locale.json'

const CountrySelectorNav = ({ shipping, lang }) => {
  const env = process.env.NODE_ENV
  const { allContentfulCountry, allFile } = useStaticQuery(graphql`
    {
      allContentfulCountry {
        edges {
          node {
            name
            market_id
            defaultLocale
            code
            node_locale
            domain
          }
        }
      }
      allFile(filter: { publicURL: { regex: "/(it-|us-)/" } }, limit: 2) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `)
  const countries = allContentfulCountry.edges.filter(
    ({ node }) => node.node_locale === lang
  )
  const selectedflag = allFile.edges.filter(
    ({ node }) => node.name === shipping.toLowerCase()
  )
  const flags = allFile.edges

  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        {locale[lang.replace('us', 'US')].shipping_to}: &nbsp;{' '}
        {selectedflag.map((f, i) => (
          <img key={i} src={f.node.publicURL} width="20" />
        ))}
      </a>
      <div className="navbar-dropdown">
        {countries.map(({ node: c }, i) => {
          const href =
            env !== 'development'
              ? `${
                  c.domain
                }/${c.code.toLowerCase()}/${c.defaultLocale.toLowerCase()}`
              : `/${c.code.toLowerCase()}/${c.defaultLocale.toLowerCase()}`
          const flag = flags.filter(
            ({ node }) => node.name === c.code.toLowerCase()
          )
          return (
            <a key={i} href={href} className="navbar-item">
              {flag.map((f, k) => (
                <img key={k} src={f.node.publicURL} width="20" />
              ))}
              &nbsp;{c.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}

CountrySelectorNav.defaultProps = {
  lang: 'en-us'
}

export default CountrySelectorNav
