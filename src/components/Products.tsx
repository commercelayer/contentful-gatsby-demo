import React from 'react'
import { ProductsProps } from '../types/index'
import * as CLayer from 'commercelayer-react'
import { Link } from 'gatsby'
import { usePriceLoading } from '../hooks/index'
import loader from '../images/three-dots-loader.svg'

const Products = (props: ProductsProps) => {
  const { data, shop, lang, categorySlug } = props
  const loading = usePriceLoading('clayer-prices-ready')
  return (
    <div className='columns is-multiline is-mobile'>
      {data.map((p, i) => {
        const srcImg = `https:${p.image.file.url}?fm=webp&q=75&w=556`
        const productSlug = p.name.trim().toLowerCase().replace(/\s/gm, '-')
        return (
          <div key={i} className='column is-half-touch is-one-quarter-desktop'>
            <div className='product-listing box'>
              <Link to={`/${shop}/${lang}/${categorySlug}/${productSlug}/`}>
                <img src={srcImg} alt={p.name} />
              </Link>
              <h2 className='has-text-weight-bold is-hidden-mobile'>
                {p.name}
              </h2>
              <div className='is-size-7 is-hidden-mobile'>{p.reference}</div>
              <CLayer.Price skuCode={p.variants[0].code} />
              {loading ? <img src={loader} width='50' /> : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Products
