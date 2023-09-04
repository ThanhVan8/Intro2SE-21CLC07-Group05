import React from 'react'
import store from '../assets/store.jpg'

const ShopCard = ({image, name}) => {
  return (
    <div className='flex flex-col items-center w-full h-fit'>
        <img src={image} alt='store' className='w-72 h-52 object-cover rounded-lg'/>
        <p className='text-xl my-2'>{name}</p>
    </div>
  )
}

export default ShopCard