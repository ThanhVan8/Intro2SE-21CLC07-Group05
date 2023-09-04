import React from 'react'
import shop from '../assets/shop.png'

const OrderStatusCard = ({name, address, status, total, image}) => {
    return (
        <div className='w-4/5 border border-gray rounded-2xl p-2 px-4 flex gap-8 min-w-400'>
                {/* Image */}
                <div className='flex-none flex items-center'>
                    <img src={image ? image : shop} alt="cake" className='w-16 h-16'/>
                </div>
                {/* Info */}
                <div className='flex flex-col w-full relative gap-2 justify-center'>
                    <p className='font-semibold font-serif text-base'>{name}</p>
                    <p className='text-gray-500'>{address}</p>
                    <p className='absolute top-0 right-0'>{status}</p>
                    <p className='absolute bottom-0 right-0 font-semibold text-base'>{total} VND</p>
                </div>
        </div>
      )
}

export default OrderStatusCard