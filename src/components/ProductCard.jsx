import React, { useContext, useEffect } from 'react'

import { toast } from 'react-toastify'
import { IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

import { ShoppingCart, Star } from '@mui/icons-material'
import { increment } from '../features/badgeCount/badgeCountSlice'
import { useDispatch } from 'react-redux' // Import useDispatch hook

function ProductCard(productData) {
	const dispatch = useDispatch() // Create a dispatch function

	const addToCart = () => {
		const cart = JSON.parse(localStorage.getItem('cart')) || []
		cart.push(productData.productData)
		localStorage.setItem('cart', JSON.stringify(cart))
		dispatch(increment()) // Dispatch the increment action
		toast.success(productData.productData.title + ' added to cart')
	}

	const navigate = useNavigate()

	return (
		<>
			<div className='flex basis-1/4 justify-center p-5'>
				<div className='flex justify-center w-96 h-[400px] flex-col product-bg p-5 mt-5 mb-10 bg-white rounded-xl shadow-2xl'>
					<div
						onClick={() => {
							navigate('/product/' + productData.productData.id)
						}}
						className='flex justify-center m-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer'>
						<img
							className='w-32 h-32'
							src={productData.productData.images[0]}
							alt={productData.productData.title}
						/>
					</div>
					<div>
						<div className='text-left '>
							<h3 className='font-bold'>{productData.productData.title}</h3>
						</div>
						<div>
							<h5 className=''>
								{productData.productData.description.length
									? productData.productData.description.substring(0, 50) + '...'
									: productData.productData.description}
							</h5>
						</div>
						<div>
							<h6 className=' p-1 flex justify-end items-center'>
								Category: {productData.productData.category}
							</h6>
						</div>
						<div className='flex justify-between items-center'>
							<h6 className='bg-[#12181b] rounded-xl text-white px-2 py-1 flex justify-center items-center'>
								{productData.productData.brand}
							</h6>

							<h6 className='bg-orange-500 rounded-xl text-white p-1 flex justify-center items-center'>
								<Star />
								{productData.productData.rating}
							</h6>
						</div>
						<div className='flex text-center justify-between my-2'>
							<p className='rounded-xl font-bold text-2xl p-1 flex justify-center items-center'>
								{productData.productData.price} $
							</p>
							<div className='flex flex-col'>
								<p className=' rounded-xl p-1 text-[12px]  flex justify-center items-center'>
									Discount %{productData.productData.discountPercentage}!
								</p>
								<p className='bg-red-400 text-white rounded-sm p-1 text-[12px]  flex justify-center items-center'>
									Save{' '}
									{(
										productData.productData.price *
										(productData.productData.discountPercentage / 100)
									).toFixed(2)}
									$!
								</p>
							</div>
							<Button
								size='small'
								variant='outlined'
								startIcon={<ShoppingCart />}
								onClick={addToCart}>
								Add to Cart
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCard
