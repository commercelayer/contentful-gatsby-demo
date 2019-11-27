import React from 'react'
import { ProductProps } from '../types/index'
import * as CLayer from 'commercelayer-react'
import locale from '../locale/locale.json'
import { usePriceLoading } from '../hooks/index'
import loader from '../images/three-dots-loader.svg'

const Product = (props: ProductProps) => {
  const { lang, data, onClick } = props
  const loading = usePriceLoading('clayer-prices-ready')
  const variants = data.variants.map(v => {
    return {
      code: v.code,
      name: `${data.name} (${v.size.name})`,
      label: v.size.name
    }
  })
  const amountProps = {
    amount: {
      className: 'large has-text-success'
    },
    compare: {
      className: 'large has-text-grey-light'
    }
  }
  return (
    <div className="columns">
      <div className="column is-two-thirds">
        <img src={data.image.file.url} alt={data.name} />
      </div>
      <div className="column">
        <h1 className="title">{data.name}</h1>
        <p className="description">{data.description.description}</p>
        <div className="large">
          <CLayer.Price
            skuCode={data.variants[0].code}
            AmountProps={amountProps}
          />
          {loading ? <img src={loader} width="50" /> : null}
        </div>

        <div className="select is-fullwidth variant-select-wrap">
          <CLayer.VariantSelect
            className="variant-select"
            PriceContainerId="price"
            AvailabilityMessageContainerId="availability-message"
            AddToBagId="add-to-bag"
            promptText={locale[lang].select_size}
            skus={variants}
          />
        </div>
        <CLayer.AddToBag
          className={`add-to-bag button is-success is-fullwidth`}
          id="add-to-bag"
          AvailabilityMessageContainerId="availability-message"
          text={locale[lang].add_to_bag}
          onClick={onClick}
        />

        <CLayer.AvailabilityMessageContainer id="availability-message" />

        <CLayer.AvailabilityMessageAvailableTemplate
          className="available-message has-text-success"
          availableTemplate={
            <p className="has-text-success">
              <span className="is-capitalized">{locale[lang].available}</span>{' '}
              in{' '}
              <CLayer.AvailabilityMessageMinDays className="available-message-min-days" />
              -
              <CLayer.AvailabilityMessageMaxDays className="available-message-max-days" />{' '}
              {locale[lang].days}
            </p>
          }
        />
        <CLayer.AvailabilityMessageUnavailableTemplate
          className="unavailable-message has-text-danger"
          unavailableTemplate={<p>{locale[lang].not_available}</p>}
        />
      </div>
    </div>
  )
}

export default Product
