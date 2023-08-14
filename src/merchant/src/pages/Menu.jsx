import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import FoodCard from '../components/FoodCard'

const Menu = () => {
  return (
    <>
			<Header />
				<div className='w-full mt-20 px-10'>
					<div className='grid justify-items-end'>
						<button className='w-fit bg-primary text-white font-medium p-2 rounded-lg'>Add item</button>
					</div>
					<div className='flex flex-col items-center mt-5 gap-3'>
						<FoodCard />
						<FoodCard />
						<FoodCard />
					</div>
				</div>
			<Footer />
    </>
  )
}

export default Menu