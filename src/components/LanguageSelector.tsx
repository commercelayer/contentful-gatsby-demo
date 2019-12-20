import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import locale from '../locale/locale.json'
import _ from 'lodash'

const LanguageSelector = ({ shipping, lang }) => {
  const languagesBuild = process.env.GATSBY_COUNTRY_LANGUAGES
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
  // const countries = allContentfulCountry.edges.filter(
  //   ({ node }) => node.defaultLocale === lang
  // )
  const countries = allContentfulCountry.edges.filter(({ node }) => {
    return (
      languagesBuild.search(node.defaultLocale.toLowerCase()) !== -1 &&
      languagesBuild.toLocaleLowerCase().search(node.code.toLowerCase()) !== -1
    )
  })
  // const selectedflag = allContentfulCountry.edges.filter(
  //   ({ node }) =>
  //     node.defaultLocale === lang &&
  //     node.code.toLowerCase() === lang.replace('en-', '').toLowerCase()
  // )
  const dropdownIcon = countries.length === 0 ? '' : 'has-dropdown is-hoverable'
  const disableText =
    countries.length === 0 ? 'has-text-grey dropdown-disabled' : ''
  console.log('countries.length :', countries)
  return (
    <div className={`navbar-item ${dropdownIcon}`}>
      <a className={`navbar-link is-capitalized ${disableText}`}>
        {locale[lang.replace('-us', '-US')].language}: &nbsp;{' '}
        {
          locale[lang.replace('-us', '-US')].languages[
            lang.replace('us', 'en-US')
          ]
        }
        {/* {selectedflag.map((f, i) => (
          <img key={i} src={f.node.image.file.url} width="20" />
        ))} */}
      </a>
      <div className="navbar-dropdown">
        {countries.map(({ node: c }, i) => {
          return (
            <Link
              key={i}
              className="navbar-item is-capitalized"
              to={`/${shipping.toLowerCase()}/${c.code
                .toLowerCase()
                .replace('us', 'en-us')}/`}
              state={{ marketId: c.market_id }}
            >
              {/* <img key={i} src={c.image.file.url} width="20" /> */}
              {/* &nbsp; */}
              {
                locale[lang.replace('-us', '-US')].languages[
                  c.code.toLowerCase().replace('us', 'en-US')
                ]
              }
            </Link>
          )
        })}
      </div>
    </div>
  )
}

LanguageSelector.defaultProps = {
  lang: 'en-us'
}

export default LanguageSelector
