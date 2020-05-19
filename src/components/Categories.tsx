import React from 'react'
import { Link } from 'gatsby'
import { CategoriesProps } from '../types/index'

const Categories = ({ shop, lang, data }: CategoriesProps) => {
  const env = process.env.NODE_ENV
  return (
    <div className="columns is-multiline">
      {data.map((c, i) => {
        const name = c.name
        const src = `https:${c.image.file.url}?fm=png&q=75`
        const slug = c.name
          .trim()
          .toLowerCase()
          .replace(' & ', '-')
          .replace(/ /gm, '-')
        const categoryLink =
          env !== 'production' ? `/${shop}/${lang}/${slug}` : `/${lang}/${slug}`
        return (
          <div key={i} className="column is-half-tablet is-one-fifth-desktop">
            <h2 className="has-text-weight-bold">{name}</h2>
            <div className="category-listing box">
              <Link
                to={categoryLink}
                state={{
                  categoryId: c.contentful_id
                }}
              >
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
