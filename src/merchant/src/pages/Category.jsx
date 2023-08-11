import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaCirclePlus } from "react-icons/fa6";

const Category = () => {
  return (
    <> 
			<Header />
			<div className='flex flex-col items-center px-5 mt-20 w-full gap-5'>
				<div className='flex flex-col items-center gap-3'>
					<p className='text-2xl font-bold'>CATEGORY</p>
					<p className=''>Choose categories for your products to easily access to customers</p>
				</div>
				<button>
					<FaCirclePlus className='text-primary text-xl' />
				</button>
			</div>
			<Footer />
    </>
  )
}

export default Category