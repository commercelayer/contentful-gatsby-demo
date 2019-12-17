import React from 'react'
import { Link } from 'gatsby'
import { CategoriesProps } from '../types/index'

const Categories = ({ shop, lang, data }: CategoriesProps) => {
  return (
    <div className="columns is-multiline">
      {data.map((c, i) => {
        const name = c.name
        const src = `https:${c.image.file.url}?fm=png&q=75&w=556`
        const slug = c.name
          .trim()
          .toLowerCase()
          .replace(' & ', '-')
          .replace(/ /gm, '-')
        return (
          <div key={i} className="column is-half-tablet is-one-fifth-desktop">
            <h2 className="has-text-weight-bold">{name}</h2>
            <div className="category-listing box">
              <Link
                to={`/${shop}/${lang}/${slug}`}
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
