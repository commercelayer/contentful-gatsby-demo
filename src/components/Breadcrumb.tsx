import React from 'react'
import { Link } from 'gatsby'
import { BreadcrumbProps } from '../types/index'

const Breadcrumb = (props: BreadcrumbProps) => {
	const { categoryName, shop, lang, productSlug, categoryId } = props
	const label = lang === 'it' ? 'Categorie' : 'Categories'
	return (
		<nav className='breadcrumb' aria-label='breadcrumbs'>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li className={shop && lang && !categoryName ? 'is-active' : ''}>
					<Link to={`/${shop}/${lang}`}>{label}</Link>
				</li>
				{categoryName && (
					<li className={productSlug ? '' : 'is-active'}>
						<Link
							style={{ textTransform: 'capitalize' }}
							to={`/${shop}/${lang}/${categoryName.toLowerCase()}`}
							state={{ categoryId }}
						>
							{categoryName}
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}

Breadcrumb.defaultProps = {
	categoryName: ''
}

export default Breadcrumb
