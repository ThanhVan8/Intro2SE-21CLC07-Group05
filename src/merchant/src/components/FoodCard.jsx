import React, { useState } from 'react'
import food from '../assets/food.png'


const FoodCard = () => {
	const [available, setAvailable] = useState(true)
	const handleClickAvail = () => {
		setAvailable(!available)
	}
  return (
    <div className='bg-card flex gap-3 p-3 w-full'>
        {/* Image */}
        <div className='flex-none flex items-center'>
            <img src={food} alt='food' className='w-16 h-16'/>
        </div>

        {/* Content */}
        <div className='flex flex-col w-full relative gap-2 justify-center'>
            <p className='font-semibold'>Chicken</p>
            <p className='italic'>Some description</p>
            <p className='mt-2 font-medium'>30000 VND</p>
        </div>

        {/* Buttons */}
				<div className='flex flex-col justify-between items-center'>
					{/* Available */}
					<div className='flex gap-2 self-start'>
						<input type='radio' className='w-5 h-5' checked={available === true}
						onClick={() => handleClickAvail()}/>
						{available ? <p className=''>Available</p> : <p className=''>Unavailable</p>}
					</div>
					{/* Update and Delete */}
					<div className='flex gap-2'>
						<button className='bg-yellow font-medium text-white px-2 py-1 rounded-lg'>Update</button>
						<button className='bg-red font-medium text-white px-2 py-1 rounded-lg'>Delete</button>
					</div>
				</div>
    </div>
  )
}

export default FoodCard