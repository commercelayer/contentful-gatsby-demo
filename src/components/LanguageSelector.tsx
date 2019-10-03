import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import locale from '../locale/locale.json'

const LanguageSelector = ({ shipping, lang }) => {
	const { allContentfulCountry, allFile } = useStaticQuery(graphql`
		{
			allContentfulCountry {
				edges {
					node {
						name
						market_id
						defaultLocale
						code
						node_locale
					}
				}
			}
			allFile(filter: { publicURL: { regex: "/(it-|us-)/" } }, limit: 2) {
				edges {
					node {
						publicURL
						name
					}
				}
			}
		}
	`)
	const countries = allContentfulCountry.edges.filter(
		({ node }) => node.node_locale.toLowerCase() === lang
	)
	const selectedflag = allFile.edges.filter(
		({ node }) => node.name === lang.replace('en-', '')
	)[0].node
	const flags = allFile.edges

	return (
		<div className='navbar-item has-dropdown is-hoverable'>
			<a className='navbar-link'>
				{locale[lang.replace('-us', '-US')].language}: &nbsp;{' '}
				<img src={selectedflag.publicURL} width='20' />
			</a>
			<div className='navbar-dropdown'>
				{countries.map(({ node: c }, i) => {
					console.log('c :', c)
					const flag = flags.filter(
						({ node }) => node.name === c.code.toLowerCase()
					)
					console.log(
						'traduzioni :',
						locale[c.node_locale].languages[c.node_locale],
						c.node_locale
					)
					debugger
					return (
						<Link
							key={i}
							className='navbar-item'
							to={`/${shipping}/${c.defaultLocale.toLowerCase()}/`}
							state={{ marketId: c.market_id }}
						>
							{flag.map(f => <img src={f.node.publicURL} width='20' />)}
							&nbsp;{locale[c.node_locale].languages[c.defaultLocale]}
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
