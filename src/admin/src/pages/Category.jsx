import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { FaTrashAlt } from "react-icons/fa";

const Category = () => {
  return (
    <>
        <Header/>
           {/*Add category btn */}
            <div className='w-full mt-20 px-16 grid place-content-end'>
                <button className='bg-primary text-textHeadingColor h-8 px-4 rounded-lg text-base hover:bg-opacity-80'>
                    Add Category
                </button>
            </div> 
            {/* Category list */}
            <div className='flex flex-col w-full min-h-screen gap-2 py-12 px-16'>
                <div className='w-full h-fit bg-gray grid grid-cols-2 justify-items-start py-2 px-4 gap-4'>
                    <div className='text-base'>Fried Chicken</div>
                    <div className='text-base justify-self-end '>
                        <button className='bg-red h-8 w-8 rounded-full grid place-content-center hover:bg-opacity-80'>
                            <FaTrashAlt className=' text-textHeadingColor'/>
                        </button>
                    </div>
                </div>
                <div className='w-full h-fit bg-gray grid grid-cols-2 justify-items-start py-2 px-4 gap-4'>
                    <div className='text-base'>Milk tea</div>
                    <div className='text-base justify-self-end '>
                        <button className='bg-red h-8 w-8 rounded-full grid place-content-center hover:bg-opacity-80'>
                            <FaTrashAlt className=' text-textHeadingColor'/>
                        </button>
                    </div>
                </div>
            </div>
            
        <Footer/>
    </>
  )
}

export default Category