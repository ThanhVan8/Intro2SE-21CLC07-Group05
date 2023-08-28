import React, { useEffect, useState } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import FoodCard from '../components/FoodCard'
import ManageItemForm from '../components/ManageItemForm'
import { useStateValue } from '../context/StateProvider'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { firestore } from "../config/firebase";
import useAuth from "../custom_hooks/useAuth";




const Menu = () => {
	const [{ showAddItem }, dispatch] = useStateValue()
	const handleAddItem = () => {
		dispatch({
			type: 'SET_SHOW_ADD_ITEM',
			showAddItem: !showAddItem,
		})
	}
	const merchant = useAuth();

	const fetchMenu = async(uid) => {
		try{
			const MenuRef = doc(firestore, "Menu", uid) // cai cho nay, thuc hien vao nha hang, lay uid do thay vao cai chuoi dai trong cmt kia
			const docSnap = await getDoc(MenuRef);
			console.log(docSnap.data());
		  }catch(err){
			console.error(err);
		  }
	}

	useEffect(() => {
		if (merchant) {
			fetchMenu(merchant.uid);
		}
	  }, [merchant]);

  return (
    <>
			<Header />
				<div className='w-full mt-20 px-10'>
					<div className='grid justify-items-end'>
						<button className='w-fit bg-primary text-white font-medium p-2 rounded-lg'
						onClick={handleAddItem}>Add item</button>
					</div>
					<div className='flex flex-col items-center mt-5 gap-3'>
						<FoodCard />
						<FoodCard />
						<FoodCard />
					</div>

					{showAddItem && <ManageItemForm action='add' />}
				</div>
			<Footer />
    </>
  )
}

export default Menu