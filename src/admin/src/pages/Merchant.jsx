import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

const Merchant = () => {
  return (
    <>
        <Header/>    
        <div className='flex flex-col w-full min-h-screen mt-16 gap-2 py-16 px-16'>
        <div className='w-full h-fit bg-gray grid grid-cols-3 justify-items-start py-2 px-4 gap-4'>
                <div className='text-base'>1</div>
                <div className='text-base'>Nguyen Van A</div>
                <div className='text-base'>ab1@gmail.com</div>
            </div> 

            <div className='w-full h-fit bg-gray grid grid-cols-3 justify-items-start py-2 px-4 gap-4'>
                <div className='text-base'>1</div>
                <div className='text-base'>Nguyen Van A</div>
                <div className='text-base'>ab1@gmail.com</div>
            </div>               

            <div className='w-full h-fit bg-gray grid grid-cols-3 justify-items-start py-2 px-4 gap-4'>
                <div className='text-base'>1</div>
                <div className='text-base'>Nguyen Van A</div>
                <div className='text-base'>ab1@gmail.com</div>
            </div> 

            <div className='w-full h-fit bg-gray grid grid-cols-3 justify-items-start py-2 px-4 gap-4'>
                <div className='text-base'>1</div>
                <div className='text-base'>Nguyen Van A</div>
                <div className='text-base'>ab1@gmail.com</div>
            </div>      

            <div className='w-full h-fit bg-gray grid grid-cols-3 justify-items-start py-2 px-4 gap-4'>
                <div className='text-base'>1</div>
                <div className='text-base'>Nguyen Van A</div>
                <div className='text-base'>ab1@gmail.com</div>
            </div>                             
        </div>
        <Footer/>
    </>
  )
}

export default Merchant