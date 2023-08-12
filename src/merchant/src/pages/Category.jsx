import React, { useState } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Dropdown from '../components/Dropdown';
import { FaCircleMinus }from "react-icons/fa6";

const Category = () => {
	const [categories, setCategories] = useState(['Rice', 'Milk tea', 'Noodle', 'Chicken'])
	const handleRemove = (index) => {
		console.log(index)
		// remove from database
	}
  return (
    <> 
			<Header />
			<div className='flex flex-col items-center px-5 mt-20 w-full gap-10'>
				<div className='flex flex-col items-center gap-3'>
					<p className=''>Choose categories for your products to easily access to customers</p>
					<Dropdown isDisable={false}/>
				</div>
				
				<div className='grid gap-4'>
					{categories.map((cat,index) => {
						return (
							<div key={index} className="flex gap-4">
								<Dropdown selectedValue={cat} isDisable={true} />
								<button onClick={() => handleRemove(index)}>
									<FaCircleMinus className='text-red text-xl'/>
								</button>
							</div>
						)
					})}
				</div>

			</div>
			<Footer />
    </>
  )
}

export default Category