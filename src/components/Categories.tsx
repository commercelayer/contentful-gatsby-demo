import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BaseComponent } from '../types/index'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Categories = ({ shop, lang }: BaseComponent) => {
	const query = gql`
		query MyQuery($nodeLocale: String) {
			allContentfulCategory(filter: { node_locale: { eq: $nodeLocale } }) {
				edges {
					node {
						name
						node_locale
						image {
							file {
								url
							}
						}
					}
				}
			}
		}
	`
	const { loading, error, data } = useQuery(query, {
		variables: {
			nodeLocale: lang.replace('en-us', 'en-US')
		}
	})
	if (loading) return <div>Loading...</div>
	if (error) return <div>Ops! There is an error...</div>
	const categories = data.allContentfulCategory.edges
	console.log('categories :', categories)
	return (
		<div className='columns is-multiline'>
			{categories.map(({ node: n }, i) => {
				const name = n.name
				const src = `https:${n.image.file.url}`
				const slug = n.name
					.trim()
					.toLowerCase()
					.replace(' & ', '-')
					.replace(/ /gm, '-')
				return (
					<div key={i} className='column is-half-tablet is-one-fifth-desktop'>
						<h2 className='has-text-weight-bold'>{name}</h2>
						<div className='category-listing box'>
							<Link to={`/${shop}/${lang}/${slug}`}>
								<img src={src} alt={name} />
							</Link>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Categories
