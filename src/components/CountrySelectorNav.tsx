import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'gatsby'

const CountrySelectorNav = ({ shipping, lang }) => {
	const query = gql`
		query MyQuery($lang: String, $flagName: String) {
			allContentfulCountry(filter: { node_locale: { eq: $lang } }) {
				nodes {
					code
					name
					node_locale
					defaultLocale
					market_id
				}
			}
			allFile(filter: { publicURL: { regex: "/(it-|us-)/" } }, skip: 1) {
				edges {
					node {
						publicURL
						name
					}
				}
			}
			file(name: { eq: $flagName }) {
				publicURL
				name
			}
		}
	`
	const { loading, error, data } = useQuery(query, {
		variables: {
			lang: lang.replace('en-us', 'en-US'),
			flagName: shipping
		}
	})
	if (loading) return <div>Loading...</div>
	if (error) return <div>Ops! There is an error...</div>
	const countryFlag = data.file
	const countries = data.allContentfulCountry.nodes
	const flags = data.allFile.edges
	return (
		<div className='navbar-item has-dropdown is-hoverable'>
			<a className='navbar-link'>
				shipping to: &nbsp; <img src={countryFlag.publicURL} width='20' />
			</a>
			<div className='navbar-dropdown'>
				{countries.map((c, i) => {
					console.log('c :', c)
					const flag = flags.filter(f => f.node.name === c.code.toLowerCase())
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

export default CountrySelectorNav
