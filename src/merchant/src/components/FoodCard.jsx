import React, { useState } from 'react'
import food from '../assets/food.png'
import { useStateValue } from '../context/StateProvider'
import ManageItemForm from '../components/ManageItemForm'
import DeleteMess from './DeleteMess'

const FoodCard = ({index, foodName, foodDescription, foodPrice}) => {
	const [available, setAvailable] = useState(true)
	const [{ showUpdateItem, showDeleteItem }, dispatch] = useStateValue()

	const handleClickAvail = (e) => {
		setAvailable(!available)
	}

	const updateFood = () => {
		dispatch({
			type: 'SET_SHOW_UPDATE_ITEM',
			showUpdateItem: !showUpdateItem,
		})
	}

	const deleteMess = () => {
		dispatch({
		type: 'SET_SHOW_DELETE_ITEM',
		showDeleteItem: !showDeleteItem,
		})
	}

  return (
    <div className='bg-card flex gap-3 p-3 w-full'>
        {/* Image */}
        <div className='flex-none flex items-center'>
            <img src={food} alt='food' className='w-16 h-16'/>
        </div>

        {/* Content */}
        <div className='flex flex-col w-full relative gap-2 justify-center'>
            <p className='font-semibold'>{foodName}</p>
            <p className='italic'>{foodDescription}</p>
            <p className='mt-2 font-medium'>{foodPrice} VND</p>
        </div>

        {/* Buttons */}
				<div className='flex flex-col justify-between items-center'>
					{/* Available */}
					{/* <div className='flex gap-2 self-start'>
						<input type='radio' className='w-5 h-5' checked={available === true}
						onClick={() => handleClickAvail()} />
						{available ? <p className=''>Available</p> : <p className=''>Unavailable</p>}
					</div> */}
					{/* Update and Delete */}
					<div className='flex gap-2'>
						<button className='bg-yellow font-medium text-white px-2 py-1 rounded-lg' onClick={updateFood}>Update</button>
						<button className='bg-red font-medium text-white px-2 py-1 rounded-lg' onClick={deleteMess}>Delete</button>
					</div>
					{showUpdateItem && 
					<ManageItemForm 
								action='update' 
								itemName={foodName} 
								itemPrice={foodPrice} 
								itemDescription={foodDescription}
								idItem={index} />}
					{showDeleteItem && <DeleteMess />}
				</div>
    </div>
  )
}

export default FoodCard