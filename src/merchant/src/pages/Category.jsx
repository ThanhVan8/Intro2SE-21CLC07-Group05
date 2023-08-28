import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove  } from 'firebase/firestore'
import { firestore } from '../config/firebase'
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

	const FetchCategory = async() => {
        try{
            const categoriesRef = collection(firestore, "Category")
            const cateData = new Set();
            const querySnapshot = await getDocs(categoriesRef)
            querySnapshot.forEach((doc) => {
                const cate = doc.data();
                console.log(cate.Name);
            })
        }catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        FetchCategory();
    }, []);


  return (
    <> 
			<Header />
			<div className='flex flex-col items-center px-5 mt-20 w-full h-screen gap-10'>
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