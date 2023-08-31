import React from 'react'
import store from '../assets/store.jpg'

const ShopCard = ({image, name}) => {
  return (
    <div className='flex flex-col items-center w-full h-fit'>
        <img src={store} alt='store' className='w-72 h-52 object-cover'/>
        <p className='font-mono text-xl my-2 font-semibold'>{name}</p>
    </div>
  )
}

export default ShopCard