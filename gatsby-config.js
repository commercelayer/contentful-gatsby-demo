require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}` // or '.env'
})

module.exports = {
  siteMetadata: {
    title: `Contentful Gatsby Demo`,
    description: `This is a static site e-commerce demo built with Contentful, Gatsby, and Commerce Layer`,
    author: `@commercelayer`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Contentful Gatsby Commerce`,
        short_name: `commerce`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/favicon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
      }
    },
    `gatsby-plugin-commercelayer`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true
      }
    },
    `gatsby-plugin-sass`, // {
    // 	resolve: 'gatsby-plugin-apollo',
    // 	options: {
    // 		uri: 'https://cdn.contentful.com/content/v1/spaces/blh476ckz2yh',
    // 		headers: {
    // 			Authorization: `Bearer 0c74a3cd56e5d2c8eaf65da01c9c27e32babad0ff985abb3005812ccb713666c`
    // 		}
    // 	}
    // },
    // {
    // 	resolve: `gatsby-plugin-create-client-paths`,
    // 	options: { prefixes: [ `/us/*`, `/it/*` ] }
    // }
    // {
    // 	resolve: `gatsby-plugin-i18next`,
    // 	options: {
    // 		availableLngs: [ 'en-us', 'it' ],
    // 		fallbackLng: 'en-us',
    // 		saveMissing: true,
    // 		debug: true
    // 	}
    // }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://marvel.commercelayer.io']
      }
    }
  ]
}
