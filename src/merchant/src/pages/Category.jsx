import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove  } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Dropdown from '../components/Dropdown';
import { FaCircleMinus }from "react-icons/fa6";
import useAuth from "../custom_hooks/useAuth";
import { getAuth } from "firebase/auth";

const Category = () => {
	const [categories, setCategories] = useState([])
	// const[merchantCate, setMerchantCate] = useState([])

	const handleRemove = (index) => {
		console.log(index)

	}
	const merchant = useAuth();
	const merchantCategories = []
	const FetchMerchantCate = async(uid) => {
		try{
			const cate = ''
			const MerchantCateRef = doc(firestore, "Merchant", uid)
			const docSnap = await getDoc(MerchantCateRef)
			const merchantCate = docSnap.data()['Categories'];
			setCategories(merchantCate)
			for (let i = 0; i < merchantCate.length; i++){
				const CategoryRef = doc(firestore, "Category", merchantCate[i])
				const docSnap = await getDoc(CategoryRef)
				const cate = docSnap.data().Name;
				merchantCategories.push(cate)
			}
			console.log(merchantCategories);
			
		}catch(err){
			console.error(err);
		}
	}

	useEffect(() => {
		if(merchant){
			FetchMerchantCate(merchant.uid);
		}
	},[merchant]);

	// const DeleteCategory = async(index) => {
	// 	try{
	// 		const merchantRef = doc(firestore, "Merchant", merchant.uid)
	// 		let ID = ''
	// 		const q = query(collection(firestore, "Category"),where ('Name',"==", cate));
	// 		const querySnapshot = await getDocs(q)
	// 		querySnapshot.forEach((doc) => {
	// 			ID = doc.id;
	// 		});
	// 		await updateDoc(merchantRef, {
	// 			Categories: arrayUnion(ID),
	// 		});                
	// 	}catch(err){
	// 		console.error(err);
	// 	}
	// } 

	// useEffect(() => {
	// 	if(merchant){
	// 		AddCategory("cate");
	// 	}
	// },[]);

// Category cua ca he thong
	// const FetchCategory = async() => {
    //     try{
    //         const categoriesRef = collection(firestore, "Category")
    //         const cateData = new Set();
    //         const querySnapshot = await getDocs(categoriesRef)
    //         querySnapshot.forEach((doc) => {
    //             const cate = doc.data();
    //             console.log(cate.Name);
    //         })
    //     }catch(err){
    //         console.error(err);
    //     }
    // }
    // useEffect(() => {
    //     FetchCategory();
    // }, []);


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