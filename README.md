# How to Build a Static Site Ecommerce with Contentful, Gatsby, and Commerce Layer

Static sites are the future of Web: fast, secure, and scalable by design. We say that they are the future of e-commerce as well (enterprise included) and this tutorial aims to demonstrate our statement. It is based on the site architecture and development workflow presented in [this blog post](https://www.contentful.com/blog/2018/11/07/how-build-static-site-ecommerce-jekyll-contentful-commerce-layer/), except it uses Gatsby as the SSG instead of Jekyll.

> Feel free to play with the new live demo [here](https://contentful-gatsby-demo.netlify.com/).  
Use the `4111 1111 1111 1111` test card (with any CVV and future expiration date) if you want to place a test order.

### Table of contents

1. [Create the content model](#1-create-the-content-model)
2. [Import test data into Contentful](#2-import-test-data-into-contentful)
3. [Enrich the product catalog](#3-enrich-the-product-catalog)
4. [Create the Gatsby site and import catalogs](#4-create-the-gatsby-site-and-import-catalogs)
5. [Create a custom page generator](#5-create-a-custom-page-generator)
6. [Add ecommerce to the site](#6-add-ecommerce-to-the-site)
7. [Summary](#7-summary)

## 1. Create the content model

The first step of our tutorial requires a Contentful account. If you don't have an account, you can create one for free [here](https://www.contentful.com/sign-up/). Once logged in, create an empty space and take note of the following credentials:

- Organization ID
- Space ID
- Content management access token
- Content delivery access token

Then create the `~/.contentfulrc` file and store all your credentials as follows:

```
# .contentfulrc

[global]
CONTENTFUL_ORGANIZATION_ID = <your-organization-id>
CONTENTFUL_MANAGEMENT_ACCESS_TOKEN = <your-content-management-access-token>

[Contentful Commerce]
CONTENTFUL_SPACE_ID = <your-space-id>
CONTENTFUL_DELIVERY_ACCESS_TOKEN = <your-content-delivery-access-token>
```

Now download the [content_model.json](https://github.com/commercelayer/contentful-gatsby-demo/blob/master/content_model.json) file from our repo and bootstrap you space as follows:

```
$ gem install contentful_bootstrap
$ contentful_bootstrap update_space <your-space-id> -j path/to/content_model.json
```

This will create your content model, that should look like this:

![Contentful Ecommerce Content Model](docs/images/content_model.png?raw=true "Contentful Ecommerce Content Model")

Let's take a look at each model.

### Variant

Variants represent the items that are being sold. The most relevant attribute is *Code* that will be used as the reference (SKU) to make them shoppable through Commerce Layer (more on this later). Also, note that each variant can be linked to a *Size*.

![Contentful Ecommerce Content Model (Variant)](docs/images/variant.png?raw=true "Contentful Ecommerce Content Model (Variant)")

### Size

Sizes are very simple models with a name, that will be one of "Small", "Medium", "Large" for T-shirts or "18x24" for poster and canvas.

![Contentful Ecommerce Content Model (Size)](docs/images/size.png?raw=true "Contentful Ecommerce Content Model (Size)")

### Product

Products group variants of the same type (and different sizes). Products can have their own images and descriptions and can be merchandised by category.

![Contentful Ecommerce Content Model (Product)](docs/images/product.png?raw=true "Contentful Ecommerce Content Model (Product)")

### Category

Categories are used to group products of the same type. Note that we defined two different associations, one named *Products* and another named *Products (IT)*. This is a convention that will let merchandisers define a base product selection and sorting and eventually override it by country. When generating the catalog pages for a given country, we will first check if that country (Italy in our case) has a dedicated association. If not, we will fall back to the default one.

![Contentful Ecommerce Content Model (Category)](docs/images/category.png?raw=true "Contentful Ecommerce Content Model (Category)")

### Catalog

Catalogs contain a list of categories, that can be selected and sorted independently. Each country will have its own catalog and it will be possible to share the same catalog between multiple countries.

![Contentful Ecommerce Content Model (Catalog)](docs/images/catalog.png?raw=true "Contentful Ecommerce Content Model (Catalog)")

### Country

Countries represent the top level of our content model. Take note of the *Market ID* attribute. Within Commerce Layer, the *Market* model lets you define a merchant, a price list, and an inventory model. Moreover, all shipping methods, payment methods, and promotions are defined by market. So the *Market ID* attribute will let us associate different business models to each country or share the same market configuration between multiple countries.

![Contentful Ecommerce Content Model (Country)](docs/images/country.png?raw=true "Contentful Ecommerce Content Model (Country)")

## 2. Import test data into Contentful

Once created the content model, we need to populate Contentful with some test data. To do that, create a [free developer account](https://core.commercelayer.io/users/sign_up) on Commerce Layer. You will be prompted to create a sample organization and seed it with test data. In a few seconds, your sample organization will be populated with about 100 SKUs like the following:

![Commerce Layer SKUs](docs/images/skus.png?raw=true "Commerce Layer SKUs")

The seeder will also create two markets (EU and US) and an OAuth2 sales channel application. 

In order to export the sample data to Contentful we need to create a Contentful application within Commerce Layer. Take note of the application credentials, including the base endpoint.

![Commerce Layer SKU Exporter](docs/images/sku_exporter.png?raw=true "Commerce Layer SKU Exporter")

Then create the `~/.commercelayer-cli.yml` file on your local environment and store all your credentials as follows:

```
# .commercelayer-cli.yml

commercelayer:
  site: <your-base-endpoint>
  client_id: <your-client-id>
  client_secret: <your-client-secret>
contentful:
  space: <your-space-id>
  access_token: <your-content-management-access-token>
```

Finally, export your sample data into Contentful by running the following commands:

```
$ gem install commercelayer-cli
$ commercelayer-cli export contentful
```

>Recently we released an [UI extension](https://www.contentful.com/developers/marketplace/commercelayer-sku/) that lets you visually associate an SKU to any model on Contentful. It brings the SKU code into the content model, so that you can make it shoppable on the front-end by leveraging the Commerce Layer [API](https://docs.commercelayer.io/api/). Check it out!

## 3. Enrich the product catalog

The SKUs that we exported from Commerce Layer to Contentful created a list of variants and products, using the SKU references to automatically associate variants to products. Now we need to enrich the catalog on Contentful with product images, descriptions and categories. For the sake of simplicity, we skip this part of the tutorial. Anyway, it's important to notice how this process is independent of the ecommerce platform. Content editors are not locked into any templating system or front-end framework. They are free to create any content. The product prices and the stock will be managed by Commerce Layer transparently, as well as the shopping cart and checkout experience.

## 4. Create the Gatsby site and import catalogs

Now that we have all our content and commerce models set up, it's time to create the website.
First all, we have to follow Gabtsby's quick start](https://www.gatsbyjs.org/docs/quick-start/) for preparing our environment.
After we run the following commands to install [Contenful plugin](https://www.gatsbyjs.org/packages/gatsby-source-contentful/):

```
$ npm install --save gatsby-source-contentful
```

We create `.env` file and set our variables:

```
# .env
CONTENTFUL_SPACE_ID=YOUR_SPACE_ID
CONTENTFUL_DELIVERY_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```

Go to set the configuration into our `gatsby-config.js`:
```s
{
  resolve: `gatsby-source-contentful`,
  options: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  }
}
```
> Reminder: Learn about environment variables: https://gatsby.dev/env-vars

Well done! Now we can pass to next step, we have to create our pages from Contentful and can follow this tutorial about [creating pages](https://www.gatsbyjs.org/tutorial/part-seven/).

## 5. Create a custom page generator

To create our custom page generator, we write in `gatsby-node.js` the following code:

```
// Read all data from Contentful
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allContentfulCountry {
        edges {
          node {
            node_locale
            code
            catalogue {
              name
              node_locale
              categories {
                name
                products {
                  name
                  contentful_id
                }
                contentful_id
              }
            }
          }
        }
      }
    }
  )
}
```

Got everything from Contentful we have to create a slug for our pages.

```
// ...

result.data.allContentfulCountry.edges.forEach(({ node }) => {
  // Catalogue page
  createPage({
    path: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/`,
    component: path.resolve(`./src/templates/CatalogPage.tsx`),
    context: {
      // Data passed to context is available in page queries as GraphQL variables.
      slug: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/`,
      language: node.node_locale,
      shipping: node.code,
      pageTitle: node.node_locale === 'it' ? 'Categorie' : 'Categories'
    }
  })
  node.catalogue.categories.map(c => {
    const categorySlug = c.name
      .trim()
      .toLowerCase()
      .replace(' & ', ' ')
      .replace(/\s/gm, '-')
    // Category page
    createPage({
      path: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}`,
      component: path.resolve(`./src/templates/CategoryPage.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}`,
        language: node.node_locale,
        shipping: node.code,
        categoryId: c.contentful_id,
        categorySlug,
        pageTitle: c.name.trim()
      }
    })
    c.products.map(p => {
      const productSlug = p.name.trim().toLowerCase().replace(/\s/gm, '-')
      // Product
      createPage({
        path: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}/${productSlug}`,
        component: path.resolve(`./src/templates/ProductPage.tsx`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: `/${node.code.toLowerCase()}/${node.node_locale.toLowerCase()}/${categorySlug}/${productSlug}`,
          language: node.node_locale,
          shipping: node.code,
          categoryId: c.contentful_id,
          categorySlug,
          categoryName: c.name.trim(),
          productId: p.contentful_id,
          pageTitle: p.name.trim()
        }
      })
    })
  })
})
```

Voilà! 😎 

Now we are ready to create our [templates](./src/templates). For example we can write the products page:

```
// CategoryPage.tsx

import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Products from '../components/Products'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import useShoppingBag from '../hooks'
import SEO from '../components/seo'

export default (props) => {
  const {
    pageContext: { language, shipping, slug, categorySlug, pageTitle }, data
  } = props

  const products =
    shipping.toLowerCase() === 'it' &&
    data.contentfulCategory.products_it &&
    data.contentfulCategory.products_it.length > 0
      ? data.contentfulCategory.products_it
      : data.contentfulCategory.products
    
  const [status, setStatus] = useShoppingBag()
  
  return (
    <Layout
      {...props}
      shoppingBagStatus={status}
      setShoppingBagStatus={setStatus}
    >
      <SEO title={pageTitle} />
      <Breadcrumb
        shop={shipping.toLowerCase()}
        lang={language}
        uri={slug}
        categorySlug={categorySlug}
        categoryName={data.contentfulCategory.name.trim()}
      />
      <Products
        shop={shipping.toLowerCase()}
        lang={language.toLowerCase()}
        data={products}
        categorySlug={categorySlug}
      />
    </Layout>
  )
}

export const query = graphql`
  query Products($categoryId: String, $language: String) {
    contentfulCategory(
      contentful_id: { eq: $categoryId }
      node_locale: { eq: $language }
    ) {
      name
      products {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
      node_locale
      products_it {
        contentful_id
        name
        image {
          file {
            url
          }
        }
        reference
        variants {
          code
        }
      }
    }
  }
`
```

Run the following command for showing our application:

```
$ gatsby develop
```

**US** :us:

![Contentful + Commerce Layer (US catalog)](docs/images/products.png?raw=true "Contentful + Commerce Layer (US catalog)")

**IT** :it:

![Contentful + Commerce Layer (IT catalog)](docs/images/products_it.png?raw=true "Contentful + Commerce Layer (IT catalog)")

The site has no prices yet. Time to add ecommerce to our beautiful products.

## 6. Add ecommerce to the site

To start selling, we need a Commerce Layer sales channel application. Just get the one created by the initial seeder and take note of its credentials.

![Commerce Layer Sales Channel Application](docs/images/sales_channel.png?raw=true "Commerce Layer Sales Channel Application")

### Install the JS library

Commerce Layer ships with a [Javascript library](https://github.com/commercelayer/commercelayer-js) that can be dropped into any website to make its content shoppable. Despite being very simple, it can be used as-is or as a starting point for your own custom code (contributors are welcome!).

We made a [gatsby plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-commercelayer) of course! This library has as dependence our [ReactJs library](https://github.com/commercelayer/commercelayer-react) that we should use for getting the final result.

Let's add it to our project, using npm:

```
$ npm install gatsby-plugin-commercelayer
```

```
// gatsby-config.js
modules.export = {
	// ...
  plugins: [
    //....
    `gatsby-plugin-commercelayer`
  ]
}

```

Add the configuration about Commerce Layer to `Layout.tsx`

```
import React from 'react'
import PropTypes from 'prop-types'
import * as CLayer from 'commercelayer-react'
import Header from './Header'
import Footer from './Footer'
import 'bulma'
import '../stylesheets/main.css'
import ShoppingBag from './ShoppingBag'

const Layout = ({
  children,
  location,
  shoppingBagStatus,
  setShoppingBagStatus,
  ...props
}) => {
  const { pageContext: { shipping, language } } = props
  const marketId = shipping === 'US' ? '76' : '75'
  const sectionOpacity = shoppingBagStatus ? 'open' : ''
  return (
    <React.Fragment>
      <Header
        shipping={shipping}
        lang={language}
        shoppingBagPreviewProps={{
          onClick: setShoppingBagStatus
        }}
      />
      <section id='main' className={`section ${sectionOpacity}`}>
        <div className='container'>{children}</div>
      </section>
      <Footer />
      <ShoppingBag
        lang={language}
        open={shoppingBagStatus}
        close={setShoppingBagStatus}
      />
      <CLayer.Config
        baseUrl='https://yourdomain.commercelayer.io'
        clientId='YOUR_CLIENT_ID'
        marketId={marketId}
        countryCode={shipping ? shipping.toUpperCase() : 'US'}
        languageCode={
          language ? language.toLowerCase().replace('-us', '') : 'en'
        }
        cartUrl='https://contentful-gatsby-demo.netlify.com/'
        returnUrl='https://contentful-gatsby-demo.netlify.com/'
        privacyUrl='https://contentful-gatsby-demo.netlify.com/'
        termsUrl='https://contentful-gatsby-demo.netlify.com/'
      />
    </React.Fragment>
  )
}
```

### Add prices

To make the prices appear, add the following snippets to the products and product templates. The library will look into the page and populate the price amounts for each element that contains a *skuCode* property:

```
// ./src/components/Product.tsx
import * as CLayer from 'commercelayer-react'

// Your React Component
return (
  // ...
  <CLayer.Price skuCode={p.variants[0].code} />
  // ...
)
```

### Add availability messages

With a similar approach, the JS library searches pages for elements with class `.variant` and checks their availability on Commerce Layer by their `data-sku-code`. It also adds the required event listeners to the `.variant-select` dropdown and to the `.add-to-bag` button, activating the purchasing functions. When a variant option is selected, the `.available-message` gets populated with the selected variant's delivery lead time information and shows the `.unavailable-message` when it goes out of stock.

We go to made the product component and later we will put in [`ProductPage.tsx`](./src/templates/ProductPage.tsx)

```
// ./src/components/Product.tsx

return (
  // ...
  <CLayer.VariantSelect
    className='variant-select'
    PriceContainerId='price'
    AvailabilityMessageContainerId='availability-message'
    AddToBagId='add-to-bag'
    promptText={locale[lang].select_size}
    skus={variants}
  />
  <CLayer.AddToBag
    className={`add-to-bag button is-success is-fullwidth`}
    id='add-to-bag'
    AvailabilityMessageContainerId='availability-message'
    text={locale[lang].add_to_bag}
    onClick={onClick}
  />
  <CLayer.AvailabilityMessageContainer id='availability-message' />
  <CLayer.AvailabilityMessageAvailableTemplate
    className='available-message has-text-success'
    availableTemplate={
      <p className='has-text-success'>
        <span className='is-capitalized'>
          {locale[lang].available}
        </span>
        {' '}in{' '}
        <CLayer.AvailabilityMessageMinDays className='available-message-min-days' />
        -
        <CLayer.AvailabilityMessageMaxDays className='available-message-max-days' />{' '}
        {locale[lang].days}
      </p>
    }
  />
  <CLayer.AvailabilityMessageUnavailableTemplate
    className='unavailable-message has-text-danger'
    unavailableTemplate={<p>{locale[lang].not_available}</p>}
  />
)
```

### Add a shopping bag

The final step is to add the required markup to the DOM to enable the shopping bag and the shopping bag preview components:

```
// ShoppingBagPreview.tsx

const ShoppingBagPreview = ({ onClick }) => {
  return (
    <a className='navbar-item' id='shopping-bag-toggle' onClick={onClick}>
      <span className='icon'>
        <FontAwesomeIcon icon={faShoppingBag} />
      </span>
      <span
        className='clayer-shopping-bag-items-count tag is-warning is-rounded'
        id='shopping-bag-preview-count'
      >
        0
      </span>
    </a>
  )
}
```
```
// ShoppingBag.tsx

const ShoppingBag = ({ open, close, lang }: ShoppingBagProps) => {
  return !lang ? null : (
    <div id='shopping-bag' className={open ? 'open' : ''}>
      <div className='shopping-bag-content'>
        <div className='columns'>
          <div className='column'>
            <h4 className='has-text-weight-bold'>
              {locale[lang].your_shopping_bag}
            </h4>
          </div>
          <div className='column'>
            <CLayer.ShoppingBagTotal />
          </div>
        </div>
        <div className='shopping-bag-unavailable-message has-text-danger'>
          {locale[lang].out_of_stock}
        </div>
        <CLayer.ShoppingBagItems
          ItemsContainerTag='table'
          itemTemplate={
            <table id='shopping-bag-table' className='table is-fullwidth'>
              <tr>
                <td className='shopping-bag-col shopping-bag-col-image'>
                  <CLayer.ShoppingBagItemImage />
                </td>
                <td className='shopping-bag-col shopping-bag-col-name'>
                  <CLayer.ShoppingBagItemName />
                </td>
                <td className='shopping-bag-col shopping-bag-col-qty'>
                  <CLayer.ShoppingBagItemQtyContainer />
                </td>
                <td className='shopping-bag-col shopping-bag-col-total'>
                  <CLayer.ShoppingBagItemUnitAmount />
                </td>
                <td className='shopping-bag-col shopping-bag-col-remove'>
                  <CLayer.ShoppingBagItemRemove />
                </td>
              </tr>
            </table>
          }
        />
        <div className='columns'>
          <div className='column'>
            <a
              className='button is-fullwidth'
              id='shopping-bag-close'
              onClick={close}
            >
              {locale[lang].continue_shopping}
            </a>
          </div>
          <div className='column'>
            <CLayer.Checkout className={'button is-fullwidth is-success'} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

Regardless of the style, the relevant elements are the following:

- **#shopping-bag:** the shopping bag container
- **#shopping-bag-toggle:** toggles the ".open" class to the shopping bag container
- **#shopping-bag-preview-count:** gets populated with the numer shopping bag items
- **#shopping-bag-preview-total:** gets populated with the order total
- **#shopping-bag-table:** the shopping bag line items container (table)
- **#shopping-bag-close:** removes the ".open" class to the shopping bag container
- **#shopping-bag-checkout:** redirects the customer to the checkout pages

The result is a full-featured shopping bag that lets customers manage their line items and proceed to checkout :tada:

![Contentful + Commerce Layer Shopping Bag](docs/images/shopping_bag.png?raw=true "Contentful + Commerce Layer Shopping Bag")

>The demo features our open source [checkout application](https://github.com/commercelayer/commercelayer-checkout). It can be used as is or as a reference in case you need to develop a custom checkout experience through the [API](https://docs.commercelayer.io/api/), to fully match your branding requirements.

## 7. Summary

In this tutorial, we have built a static site ecommerce with the following enterprise-level features:

- Multi-country
- Multi-language
- Multi-catalog
- Multi-currency
- Multi-warehouse
- Fast, scalable and secure by design

We used Gatsby as the SSG, Contentful to manage content and Commerce Layer to add ecommerce to the site. This stack lets creatives and developers build any customer experience; content editors publish outstanding content and merchants manage their business and fulfill orders through the ecommerce platform.

The next steps could be to add full-text search capabilities using a tool like [Algolia](https://www.algolia.com/) or build a customer account section where they can see their order history, manage their address books, and wallets.
