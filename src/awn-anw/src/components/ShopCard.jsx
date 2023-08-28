import React from 'react'
import store from '../assets/store.jpg'

const ShopCard = ({image, name}) => {
  return (
    <div className='flex flex-col items-center w-full h-fit'>
        <img src={store} alt='store' className='w-80 h-[180px] object-cover'/>
        <p>{name}</p>
    </div>
  )
}

export default ShopCard