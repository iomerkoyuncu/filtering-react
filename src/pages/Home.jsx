import React, { useEffect, useState } from 'react'
import service from './service'

import ProductCard from '../components/ProductCard'
import { TextField, IconButton } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Skeleton from '@mui/material/Skeleton'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import { useSelector } from 'react-redux'
import { GitHub } from '@mui/icons-material'

const SliderAppendix = ({ value }) => {
	return (
		<div>
			<p>
				Selected Price Range: ${value[0]} - ${value[1]}
			</p>
		</div>
	)
}

function Home() {
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [selectedCategories, setSelectedCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [value, setValue] = React.useState([0, 1000])
	const [searchQuery, setSearchQuery] = useState('')
	const [allProducts, setAllProducts] = useState([])

	const badgeCount = useSelector((state) => state.badgeCount.count)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleHighestRating = async (products) => {
		const res = products?.products?.sort((a, b) => {
			return b.rating - a.rating
		})
		setProducts({ products: res })
	}

	const handleRecommended = async (products) => {
		const res = products?.products?.sort((a, b) => {
			return b.discountPercentage - a.discountPercentage
		})
		setProducts({ products: res })
	}

	const handleHighestPriceFirst = async (products) => {
		const res = products?.products?.sort((a, b) => {
			return b.price - a.price
		})
		setProducts({ products: res })
	}

	const handleLowestPriceFirst = async (products) => {
		const res = products?.products?.sort((a, b) => {
			return a.price - b.price
		})
		setProducts({ products: res })
	}

	const handleCategoryChange = async (products) => {
		const res = products?.products?.filter((product) => {
			return selectedCategories.includes(product.category)
		})
		setProducts({ products: res })
	}

	const handleFilter = async () => {
		let filteredProducts = allProducts.products

		// Apply category filtering
		if (selectedCategories.length > 0) {
			filteredProducts = filteredProducts.filter((product) =>
				selectedCategories.includes(product.category)
			)
		}

		// Apply price range filtering
		filteredProducts = filteredProducts.filter(
			(product) => product.price >= value[0] && product.price <= value[1]
		)

		setProducts({ products: filteredProducts })
	}

	const getCategories = async () => {
		try {
			const response = await service.getCategories()
			setCategories(response.data)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	const searchProducts = async () => {
		try {
			setLoading(true)
			const response = await service.searchProducts(searchQuery)
			setProducts(response.data)
			setAllProducts(response.data)
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	useEffect(() => {
		searchProducts()
	}, [searchQuery])

	// useEffect(() => {
	// 	if (selectedCategories.length > 0) {
	// 		handleCategoryChange(products)
	// 	} else {
	// 		searchProducts()
	// 	}
	// }, [selectedCategories])

	return (
		<div className='w-full flex justify-center items-center'>
			<div className='flex   justify-center items-center '>
				<div className='flex'>
					<div className='lg:min-w-[400px] flex flex-col shadow-2xl bg-white my-10 mx-4 rounded-2xl p-5 sticky top-[20px] h-[700px] overflow-y-auto max-lg:hidden '>
						<h5 className='text-center font-bold text-xl'>Select Category</h5>

						<div className='p-2 flex justify-center items-center mb-10'>
							<Autocomplete
								disablePortal
								options={categories || []}
								onChange={(e, value) => setSelectedCategories(value)}
								multiple
								fullWidth
								renderInput={(params) => (
									<TextField {...params} label='Categories' />
								)}
							/>
						</div>

						<div className='p-2 flex flex-col justify-center items-center'>
							<h5 className='font-bold text-xl'>Price Range</h5>
							<div className='flex justify-between items-center m-2 mb-5 gap-3'>
								<div className=''>
									<TextField
										id='outlined-number'
										label='Min'
										sx={{ width: '100px' }}
										value={value[0]}
										onChange={(e) => setValue([e.target.value, value[1]])}
									/>
								</div>
								<div>
									<TextField
										id='outlined-number'
										label='Max'
										sx={{ width: '100px' }}
										value={value[1]}
										onChange={(e) => setValue([value[0], e.target.value])}
									/>
								</div>
							</div>
							<div className=' p-6 w-full'>
								<Slider
									value={value}
									min={0}
									max={3000}
									onChange={handleChange}
									valueLabelDisplay='on'
								/>
							</div>
							<SliderAppendix value={value} />
						</div>
						<div className='p-2 flex flex-col justify-center items-center'>
							<Button
								onClick={() => {
									handleFilter()
								}}
								fullWidth
								variant='contained'>
								FILTER
							</Button>
						</div>
						<div className=' h-full flex justify-evenly items-end p-2 m-2'>
							<div className='flex justify-center items-center'>
								<div className='flex justify-center items-center'>
									<a href='https://ismetomerkoyuncu.tech' target='_blank'>
										ismetomerkoyuncu
									</a>
								</div>
								<div className='flex justify-center items-center'>
									<IconButton
										href='https://github.com/iomerkoyuncu/filtering-react'
										target='_blank'>
										<GitHub />
									</IconButton>
								</div>
							</div>
						</div>
					</div>
					<div className='max-w-[1000px] min-w-[1000px] flex flex-col justify-center '>
						<div className='flex justify-evenly items-center w-full p-2'>
							<TextField
								sx={{
									width: '100%',
									maxWidth: '600px',
									marginTop: '10px',
								}}
								fullWidth
								onChange={(e) => setSearchQuery(e.target.value)}
								variant='outlined'
								placeholder='Search for products. . .'
							/>
							<button>
								<Link to='/shopping-cart'>
									<IconButton>
										<Badge badgeContent={badgeCount} color='error'>
											<ShoppingCartIcon size={'large'} />
										</Badge>
									</IconButton>
								</Link>
							</button>
						</div>
						<div className='p-2 flex justify-center items-center'>
							<FormControl>
								<RadioGroup
									defaultValue='recommended'
									sx={{ flexDirection: 'row' }}
									onChange={(event) => {
										switch (event.target.value) {
											case 'recommended':
												handleRecommended(products)
												break
											case 'highestRating':
												handleHighestRating(products)
												break
											case 'highestPriceFirst':
												handleHighestPriceFirst(products)
												break
											case 'lowestPriceFirst':
												handleLowestPriceFirst(products)
												break
											default:
												break
										}
									}}
									name='radio-buttons-group'>
									<FormControlLabel
										value='recommended'
										control={<Radio />}
										label='Recommended'
									/>
									<FormControlLabel
										value='highestRating'
										control={<Radio />}
										label='Highest Rating'
									/>
									<FormControlLabel
										value='highestPriceFirst'
										control={<Radio />}
										label='Descending Price ↓'
									/>
									<FormControlLabel
										value='lowestPriceFirst'
										control={<Radio />}
										label='Ascending Price ↑'
									/>
								</RadioGroup>
							</FormControl>
						</div>
						{loading ? (
							<div className='flex flex-wrap justify-center items-center'>
								{[1, 2, 3, 4, 5, 6, 8, 9, 10].map((item) => (
									<div key={item} className='p-4'>
										<Skeleton
											variant='rounded'
											animation='wave'
											width={420}
											height={420}
										/>
									</div>
								))}
							</div>
						) : (
							<div className='flex flex-wrap justify-center items-center gap-5'>
								{products?.products?.length > 0 ? (
									products?.products?.map((product) => {
										return (
											<ProductCard
												key={product.id}
												productData={{
													id: product.id,
													title: product.title,
													description: product.description,
													rating: product.rating,
													brand: product.brand,
													category: product.category,
													price: product.price,
													images: product.images,
													discountPercentage: product.discountPercentage,
												}}
											/>
										)
									})
								) : (
									<div className='w-[600px] h-[600px]  flex flex-col justify-center items-center rounded-md shadow-2xl bg-white'>
										<img
											src='https://static.thenounproject.com/png/1103191-200.png'
											alt='not found'
										/>
										Aradığınız ürün bulunamadı.
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
