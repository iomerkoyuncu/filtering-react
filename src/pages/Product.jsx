import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Spinner from '../assets/spinner.gif'
import { useParams } from 'react-router-dom'
import WestIcon from '@mui/icons-material/West'

import { toast } from 'react-toastify'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { IconButton } from '@mui/material'
import service from './service'
import { increment } from '../features/badgeCount/badgeCountSlice'
import { useDispatch } from 'react-redux'

function Product() {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)

	const getProduct = async (id) => {
		const res = await service.getProduct(id)
		setProduct(res.data)
		setLoading(false)
	}

	console.log(product)
	useEffect(() => {
		getProduct(params.id)
	}, [])

	const addToCart = () => {
		const cart = JSON.parse(localStorage.getItem('cart')) || []
		cart.push(product)
		localStorage.setItem('cart', JSON.stringify(cart))
		dispatch(increment())
		toast.success(product?.title + ' added to cart')
	}

	if (!loading && product) {
		return (
			<div className='w-full flex justify-center items-center'>
				<div className='w-4/5 mt-10'>
					<div className='p-2 flex'>
						<IconButton
							sx={{
								color: 'blue',
								'&:hover': {
									color: 'blue',
								},
								backgroundColor: '#e0e0e0',
							}}
							onClick={() => navigate(-1)}>
							<WestIcon />
						</IconButton>
						<p className='p-2'>
							Back to previous page | Listed in Category:{' '}
							<span className='underline '>{product?.category}</span>
						</p>
					</div>
					<div className='flex p-2'>
						<div className='p-2'>
							<img className='w-96 h-96 p-2' src={product?.images[0]} alt='' />
						</div>
						<div className='flex flex-col justify-evenly p-2'>
							<div>
								<h1 className='text-[24px]'>{product?.title}</h1>
								<small>Free 2 days shipping | 1 year warranty</small>
							</div>
							<h1>{product?.description}</h1>
							<div className='flex'>
								<h1>$</h1>
								<h1 className='p-2 text-[36px]'>{product?.price}</h1>
							</div>
							<ul className='p-2'>
								<li className='flex p-2'>
									<CheckCircleOutlineIcon />
									<p className='px-2'>Free Return</p>
								</li>
								<li className='flex p-2'>
									<CheckCircleOutlineIcon />
									<p className='px-2'>Chat with us 24 hours</p>
								</li>
								<li className='flex p-2'>
									<CheckCircleOutlineIcon />
									<p className='px-2'>Comes with a package</p>
								</li>
								<li className='flex p-2'>
									<CheckCircleOutlineIcon />
									<p className='px-2'>Comes with a package</p>
								</li>
							</ul>
							<div className='flex p-2'>
								<button className='p-2 m-2 w-64 bg-blue-500 text-white rounded'>
									Buy it Now
								</button>
								<button
									onClick={addToCart}
									className='p-2 m-2 w-64 bg-blue-200 text-blue rounded'>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		)
	} else {
		return (
			<div className='my-container'>
				<div className='w-100 m-20'>
					<img
						width={120}
						className='text-center mx-auto'
						src={Spinner}
						alt='Loading'
					/>
				</div>
			</div>
		)
	}
}

export default Product
