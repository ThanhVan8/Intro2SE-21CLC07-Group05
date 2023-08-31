import React, {useEffect, useState} from 'react'
import { useStateValue } from '../context/StateProvider'
import {FaTimes, FaMinusCircle, FaPlusCircle} from "react-icons/fa"
import cake from '../assets/cake.jpg'
import {addDoc,setDoc,collection,getDocs,query,where,doc,getDoc,updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import useAuth from "../custom_hooks/useAuth";


const AddModal = ({addedFood}) => {
	const [count, setCount] = useState(1);
	function handleAddClick() {
		setCount(count + 1);
	}
	function handleMinClick() {
			if(count>1)
				setCount(count - 1);
	}

	const [{ addFoodShow, selectedFood }, dispatch] = useStateValue()
	const handleCloseModal = () => {
		dispatch({
		type: 'SET_ADD_FOOD_SHOW',
		addFoodShow: !addFoodShow,
		})
	}

	const cart = useAuth();
	const [foods, setFoods] = useState([])
	const [quants, setQuants] = useState([])

  const addCart = async(uid) => {
		try {
			const CartRef = doc(firestore, "ShoppingCart", uid);
			
    } catch (error) {
      console.log(error);
    }
	}

  // 	const deleteCart = async (idx) => {
  //   	try {
  //     	//get array
	// 		const docSnap = await getDoc(docRef)
	// 		const food_list = docSnap.data()['Food'];
	// 		const quant_list = docSnap.data()['Quantity'];
      	
  //     	//delete
  //     	food_list.splice(idx, 1)
  //     	quant_list.splice(idx, 1) 
  //     	updateDoc(docRef, {
  //       	['Food']: food_list,
  //       	['Quantity']: quant_list
  //     	})  
  //   	}catch(err){
	// 	console.error(err);
	// 	}
	// }

	// const handleAddToCart = () => {
	// 	//write here
	// 	console.log('get cart')
	// 	// getCart()
	// 	setFoods([...foods, index])
	// 	setQuants([...quants, count])
	// 	handleCloseModal()
	// }

	useEffect(() => {
		if (cart) {
			// phan nay add m_id (khoi tao )
			// const docRef =  setDoc(collection(firestore, "ShoppingCart", cart.uid), {
			// 	merchant_id: selectedFood.idMerchant
			// });
			//
			// console.log('merchantID')
			// const getCart = async () => {
			// 	try {
			// 	//get array
			// 		const docSnap = await getDoc(docRef)
			// 		setFoods(docSnap.data()['Food']);
			// 		setQuants(docSnap.data()['Quantity']);
			// 	}catch(err){
			// 		console.error(err);
			// 	}
			// }

			// getCart()

			// updateDoc(docRef, {
			// 	['Food']: foods,
			// 	['Quantity']: quants,
			// })
		}
	}, [foods, quants, cart])


  return (
    <div className="fixed bg-black bg-opacity-25 top-0 left-0 w-full h-screen flex justify-center items-center z-50">
        <div className="bg-white drop-shadow-md p-5 w-full md:w-460 flex flex-col gap-3 rounded-lg">
            {/* Cancel icon */}
            <div className="flex justify-end w-full">
            <button onClick={handleCloseModal}>
                <FaTimes className="text-xl" />
            </button>
            </div>

						{/* Card */}
						<div className=" w-full border border-black h-fit rounded-2xl p-2 px-4 flex gap-4 items-center">
							{/* Image */}
							<div className='flex-none flex item'>
								<img src={cake} alt="cake" className='w-16 h-16 rounded-full'/>
							</div>

							{/* Info */}
							<div className='flex flex-col w-full relative gap-2'>
								<p className='font-semibold'>{addedFood.foodName}</p>
								<p className='text-[12px] text-gray-500'>{addedFood.foodDescription}</p>
							</div>
						</div>

						<div className='flex justify-between pt-5'>
							<div className='flex flex-row justify-start items-center gap-2 h-full'>
									<button onClick={handleMinClick}>
											<FaMinusCircle className='h-5 w-5 text-primary hover:opacity-80'/>
									</button>
									<div className='h-6 w-fit border border-black px-2'>{count}</div>
									<button onClick = {handleAddClick}>
											<FaPlusCircle className='h-5 w-5 text-primary hover:opacity-80'/>
									</button>
							</div>

							<p className='font-medium'>{Number(addedFood.foodPrice)*count} VND</p>
						</div>

						<div className='grid place-items-end pt-3'>
							<button
								className="rounded-3xl border bg-primary border-primary w-16 h-8
								text-textHeadingColor text-base hover:opacity-80"
								// onClick={addCart}
								>
								DONE
							</button>
						</div>
        </div>
    </div>
  )
}

export default AddModal