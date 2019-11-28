import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import favicon from '../images/favicon.png'

const CountrySelector = () => {
  const [showImg, setShowImg] = useState(false)
  const {
    allContentfulCountry: { edges },
    allFile: { edges: flags }
  } = useStaticQuery(graphql`
    {
      allContentfulCountry(limit: 2) {
        edges {
          node {
            name
            market_id
            defaultLocale
            code
          }
        }
      }
      allFile(filter: { publicURL: { regex: "/(it-|us-)/" } }) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `)
  return (
    <div id='country-selector'>
      <div className='columns'>
        <div className='column is-offset-one-quarter is-half'>
          <h1 className='title'>Choose your country</h1>
          <p className='subtitle'>
            This is a static site e-commerce demo built with{' '}
            <a href='https://www.contentful.com/'>Contentful</a>,{' '}
            <a href='https://www.gatsbyjs.org/'>Gatsby</a>, and {' '}
            <a href='https://commercelayer.io/'>Commerce Layer</a>. To get
            started, choose a shipping country below. Each country has a
            dedicated catalog, price list, and inventory model.
          </p>
          <div className='columns is-mobile'>
            {edges.reverse().map((c, i: number) => {
              const flag = flags.filter(
                f => f.node.name === c.node.code.toLowerCase()
              )
              return (
                <div key={i} className='column'>
                  <div className='box'>
                    <Link
                      to={`/${c.node.code.toLowerCase()}/${c.node.defaultLocale.toLowerCase()}`}
                    >
                      <img
                        style={{
                          display: !showImg ? 'block' : 'none',
                          margin: '0 auto'
                        }}
                        src={favicon}
                        alt='commerce layer'
                      />
                      <img
                        style={{ display: showImg ? 'block' : 'none' }}
                        src={`${flag[0].node.publicURL}?fm=webp&q=75&w=556`}
                        alt={c.node.name}
                        className='image'
                        onLoad={() => {
                          setShowImg(true)
                        }}
                      />
                    </Link>
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
