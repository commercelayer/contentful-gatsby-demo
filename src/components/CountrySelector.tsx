import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const CountrySelector = () => {
	const {
		allContentfulCountry: { edges },
		allFile: { edges: flags }
	} = useStaticQuery(graphql`
		{
			allContentfulCountry(limit: 2) {
				edges {
					node {
						name
						market_id
						defaultLocale
						code
					}
				}
			}
			allFile(filter: { publicURL: { regex: "/(it-|us-)/" } }) {
				edges {
					node {
						publicURL
						name
					}
				}
			}
		}
	`)
	return (
		<div id='country-selector'>
			<div className='columns'>
				<div className='column is-offset-one-quarter is-half'>
					<h1 className='title'>Choose your country</h1>
					<p className='subtitle'>
						This is a static site e-commerce demo built with{' '}
						<a href='https://www.contentful.com/'>Contentful</a>,{' '}
						<a href='https://www.gatsbyjs.org/'>Gatsby</a>, and {' '}
						<a href='https://commercelayer.io/'>Commerce Layer</a>. To get
						started, choose a shipping country below. Each country has a
						dedicated catalog, price list, and inventory model.
					</p>
					<div className='columns is-mobile'>
						{edges.map((c, i: number) => {
							const flag = flags.filter(
								f => f.node.name === c.node.code.toLowerCase()
							)
							return (
								<div key={i} className='column'>
									<div className='box'>
										<a
											href={`/${c.node.code.toLowerCase()}/${c.node.defaultLocale.toLowerCase()}`}
										>
											<img
												src={flag[0].node.publicURL}
												alt={c.node.name}
												className='image'
											/>
										</a>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CountrySelector
