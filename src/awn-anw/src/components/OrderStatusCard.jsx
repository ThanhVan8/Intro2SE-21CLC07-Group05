import React from 'react'
import shop from '../assets/shop.png'

const OrderStatusCard = ({name, id, status, total}) => {
    return (
        <div className='w-3/4 border border-gray rounded-2xl p-2 px-4 flex gap-8 '>
                {/* Image */}
                <div className='flex-none flex items-center'>
                    <img src={shop} alt="cake" className='w-16 h-16'/>
                </div>
                {/* Info */}
                <div className='flex flex-col w-full relative gap-2 justify-center font-mono text-base'>
                    <p className='font-semibold font-serif text-xl'>{name}</p>
                    <p className='text-gray-500'>#{id}</p>
                    <p className='absolute top-0 right-0'>{status}</p>
                    <p className='absolute bottom-0 right-0 font-semibold'>{total} VND</p>
                </div>
        </div>
      )
}

export default OrderStatusCard