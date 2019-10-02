require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}` // or '.env'
})

const config = require('gatsby-plugin-config').default

module.exports = {
	siteMetadata: {
		title: `Contentful Gatsby Demo`,
		description: ``,
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
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `locale`,
				path: `${__dirname}/src/locale`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
			}
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: config.CONTENTFUL_SPACE_ID,
				// Learn about environment variables: https://gatsby.dev/env-vars
				accessToken: config.CONTENTFUL_ACCESS_TOKEN
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
		`gatsby-plugin-sass`,
		{
			resolve: 'gatsby-plugin-apollo',
			options: {
				uri: '/__graphql'
			}
		},
		{
			resolve: `gatsby-plugin-create-client-paths`,
			options: { prefixes: [ `/us/*`, `/it/*` ] }
		}
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
		// `gatsby-plugin-offline`,
	]
}
