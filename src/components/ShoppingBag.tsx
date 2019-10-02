import React from 'react'
import * as CLayer from 'commercelayer-react'
import { ShoppingBagProps } from '../types/index'

const ShoppingBag = ({ open, close }: ShoppingBagProps) => {
	return (
		<div id='shopping-bag' className={open ? 'open' : ''}>
			<div className='shopping-bag-content'>
				<div className='columns'>
					<div className='column'>
						<h4 className='has-text-weight-bold'>Your shopping bag</h4>
					</div>
					<div className='column'>
						<CLayer.ShoppingBagTotal />
					</div>
				</div>
				<div className='shopping-bag-unavailable-message has-text-danger'>
					Out of stock
				</div>
				<CLayer.ShoppingBagItems
					ItemsContainerTag='table'
					itemTemplate={
						<table id='shopping-bag-table' className='table is-fullwidth'>
							<tr>
								<td className='shopping-bag-col shopping-bag-col-image'>
									<CLayer.ShoppingBagItemImage />
								</td>
								<td className='shopping-bag-col shopping-bag-col-name'>
									<CLayer.ShoppingBagItemName />
								</td>
								<td className='shopping-bag-col shopping-bag-col-qty'>
									<CLayer.ShoppingBagItemQtyContainer />
								</td>
								<td className='shopping-bag-col shopping-bag-col-total'>
									<CLayer.ShoppingBagItemUnitAmount />
								</td>
								<td className='shopping-bag-col shopping-bag-col-remove'>
									<CLayer.ShoppingBagItemRemove />
								</td>
							</tr>
						</table>
					}
				/>
				<div className='columns'>
					<div className='column'>
						<a
							className='button is-fullwidth'
							id='shopping-bag-close'
							onClick={close}
						>
							Continue shopping
						</a>
					</div>
					<div className='column'>
						<CLayer.Checkout />
					</div>
				</div>
			</div>
		</div>
	)
}

ShoppingBag.defaultProps = {
	open: false
}

export default ShoppingBag
