import React from 'react'
import shop from '../assets/shop.png'

const OrderStatusCard = ({name, id, status, total}) => {
    return (
        <div className='w-full border rounded-lg p-2 px-4 flex gap-4'>
                {/* Image */}
                <div className='flex-none flex items-center'>
                    <img src={shop} alt="cake" className='w-16 h-16 rounded-full'/>
                </div>
                {/* Info */}
                <div className='flex flex-col w-full relative gap-2 justify-center'>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-gray-500'>#{id}</p>
                    <p className='absolute top-0 right-0'>{status}</p>
                    <p className='absolute bottom-0 right-0 font-semibold'>{total} VND</p>
                </div>
        </div>
      )
}

export default OrderStatusCard