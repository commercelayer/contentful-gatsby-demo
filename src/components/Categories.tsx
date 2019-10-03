import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BaseComponent } from '../types/index'

const Categories = ({ shop, lang }: BaseComponent) => {
	React.useEffect(
		() => {
			if (window.commercelayer) {
				window.commercelayer.init()
				console.log('=== INIT COMMERCELAYER ====')
			}
		},
		[ window.commercelayer ]
	)
	const data = useStaticQuery(graphql`
		query CatalogueCategories {
			allContentfulCountry {
				nodes {
					catalogue {
						categories {
							name
							node_locale
							image {
								file {
									url
								}
							}
							contentful_id
						}
						node_locale
						name
					}
				}
			}
		}
	`)
	const catalogues = data.allContentfulCountry.nodes
	const category = catalogues.filter(
		({ catalogue }) =>
			catalogue.name.toLowerCase() === shop &&
			lang === catalogue.node_locale.toLowerCase()
	)[0].catalogue.categories
	return (
		<div className='columns is-multiline'>
			{category.map((c, i) => {
				const name = c.name
				const src = `https:${c.image.file.url}`
				const slug = c.name
					.trim()
					.toLowerCase()
					.replace(' & ', '-')
					.replace(/ /gm, '-')
				return (
					<div key={i} className='column is-half-tablet is-one-fifth-desktop'>
						<h2 className='has-text-weight-bold'>{name}</h2>
						<div className='category-listing box'>
							<Link
								to={`/${shop}/${lang}/${slug}`}
								state={{ categoryId: c.contentful_id }}
							>
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
