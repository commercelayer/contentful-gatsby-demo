import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const Categories = ({ shop, lang }) => {
  const {
    allContentfulCategory: { edges }
  } = useStaticQuery(graphql`
    {
      allContentfulCategory {
        edges {
          node {
            name
            node_locale
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
  return (
    <div className="columns is-multiline">
      {edges
        .filter(({ node }) => node.node_locale.toLowerCase() === lang)
        .map(({ node: n }, i) => {
          console.log('n :', n)
          const name = n.name
          const src = `https:${n.image.file.url}`
          const slug = n.name
            .trim()
            .toLowerCase()
            .replace(' & ', '-')
            .replace(/ /gm, '-')
          return (
            <div key={i} className="column is-half-tablet is-one-fifth-desktop">
              <h2 className="has-text-weight-bold">{name}</h2>
              <div className="category-listing box">
                <Link to={`/${shop}/${lang}/${slug}`}>
                  <img src={src} alt={name} />
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Categories
