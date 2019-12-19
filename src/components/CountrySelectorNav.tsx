import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import locale from '../locale/locale.json'

const CountrySelectorNav = ({ shipping, lang }) => {
  const env = process.env.NODE_ENV
  const { allContentfulCountry } = useStaticQuery(graphql`
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
  const countries = allContentfulCountry.edges.filter(
    ({ node }) => node.defaultLocale === lang
  )
  const selectedflag = allContentfulCountry.edges.filter(
    ({ node }) => node.code === shipping && node.defaultLocale === lang
  )
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        {locale[lang.replace('us', 'US')].shipping_to}: &nbsp;{' '}
        {selectedflag.map((f, i) => (
          <img key={i} src={f.node.image.file.url} width="20" />
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
          return (
            <a key={i} href={href} className="navbar-item">
              <img key={i} src={c.image.file.url} width="20" />
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
