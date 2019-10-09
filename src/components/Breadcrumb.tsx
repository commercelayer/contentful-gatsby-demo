import React from 'react'
import { Link } from 'gatsby'
import { BreadcrumbProps } from '../types/index'
import locale from '../locale/locale.json'

const Breadcrumb = (props: BreadcrumbProps) => {
	const { categorySlug, shop, lang, productSlug, categoryName } = props
	const label = locale[lang].categories
	return (
		<nav className='breadcrumb' aria-label='breadcrumbs'>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li
					className={
						shop && lang && !categorySlug ? (
							'is-capitalized is-active'
						) : (
							'is-capitalized'
						)
					}
				>
					<Link to={`/${shop}/${lang.toLowerCase()}`}>{label}</Link>
				</li>
				{categorySlug && (
					<li className={productSlug ? '' : 'is-active'}>
						<Link to={`/${shop}/${lang.toLowerCase()}/${categorySlug}`}>
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
