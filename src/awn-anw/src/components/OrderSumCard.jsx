import React from 'react'
import cake from '../assets/cake.jpg'

const OrderSumCard = ({name, description, quantity, price}) => {
  return (
    <div className='w-full border rounded-lg p-2 px-4 flex gap-4'>
			{/* Image */}
			<div className='flex-none flex item'>
				<img src={cake} alt="cake" className='w-16 h-16 rounded-full'/>
			</div>
			{/* Info */}
			<div className='flex flex-col w-full relative gap-2'>
				<p className='font-semibold'>{name}</p>
				<p className='text-[12px] text-gray-500'>{description}</p>
				<p className=''>x{quantity}</p>
				<p className='absolute bottom-0 right-0'>{price} VND</p>
			</div>
    </div>
  )
}

export default OrderSumCard