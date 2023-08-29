import React, { useState } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import FoodCard from '../components/FoodCard'
import ManageItemForm from '../components/ManageItemForm'
import { useStateValue } from '../context/StateProvider'

const Menu = () => {
	const [{ showAddItem }, dispatch] = useStateValue()
	const handleAddItem = () => {
		
		dispatch({
			type: 'SET_SHOW_ADD_ITEM',
			showAddItem: !showAddItem,
		})
	}
  return (
    <>
		<Header />
				<div className='w-full h-screen mt-20 px-10'>
					<div className='grid justify-items-end'>
						<button className='w-fit bg-primary text-white font-medium p-2 rounded-lg'
						onClick={handleAddItem}>Add item</button>
					</div>
					<div className='flex flex-col items-center mt-5 gap-3'>
						<FoodCard />
						<FoodCard />
						<FoodCard />
					</div>

					{showAddItem && <ManageItemForm action='add' />}
				</div>
		<Footer />
			
    </>
  )
}

export default Menu