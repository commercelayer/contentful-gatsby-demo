import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import locale from '../locale/locale.json'
import _ from 'lodash'

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
		({ node }) => node.node_locale === lang
	)
	const selectedflag: any = allFile.edges.filter(
		({ node }) => node.name === shipping.toLowerCase()
	)
	const flags = allFile.edges

	return (
		<div className='navbar-item has-dropdown is-hoverable'>
			<a className='navbar-link is-capitalized'>
				{locale[lang.replace('-us', '-US')].language}: &nbsp;{' '}
				{selectedflag.map((f, i) => (
					<img key={i} src={f.node.publicURL} width='20' />
				))}
			</a>
			<div className='navbar-dropdown'>
				{countries.map(({ node: c }, i) => {
					const flag = flags.filter(
						({ node }) => node.name === c.code.toLowerCase()
					)
					return (
						<Link
							key={i}
							className='navbar-item is-capitalized'
							to={`/${shipping.toLowerCase()}/${c.defaultLocale.toLowerCase()}/`}
							state={{ marketId: c.market_id }}
						>
							{flag.map((f, k) => (
								<img key={k} src={f.node.publicURL} width='20' />
							))}
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
