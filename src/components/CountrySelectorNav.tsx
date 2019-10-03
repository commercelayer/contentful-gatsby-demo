import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const CountrySelectorNav = ({ shipping, lang }) => {
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
		({ node }) => node.name === shipping
	)[0].node
	const flags = allFile.edges

	return (
		<div className='navbar-item has-dropdown is-hoverable'>
			<a className='navbar-link'>
				shipping to: &nbsp; <img src={selectedflag.publicURL} width='20' />
			</a>
			<div className='navbar-dropdown'>
				{countries.map(({ node: c }, i) => {
					const flag = flags.filter(
						({ node }) => node.name === c.code.toLowerCase()
					)
					return (
						<Link
							key={i}
							className='navbar-item'
							to={`/${c.code.toLowerCase()}/${c.defaultLocale.toLowerCase()}/`}
							state={{ marketId: c.market_id }}
						>
							<img src={flag[0].node.publicURL} width='20' />&nbsp;{c.name}
						</Link>
					)
				})}
			</div>
		</div>
	)
}

CountrySelectorNav.defaultProps = {
	lang: 'en-us'
}

export default CountrySelectorNav
