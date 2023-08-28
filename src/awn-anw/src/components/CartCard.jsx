import React from 'react'
import { useState } from 'react';
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

import cake from "../assets/cake.jpg"

const CartCard = ({name, quantity, price, idFood}) => {
    const [count, setCount] = useState(quantity);

    function handleAddClick() {
      setCount(count + 1);
    }

    function handleMinClick() {
        if(count>1)
            setCount(count - 1);
        if (count <1)
        deleteCart(idFood)
    }
      	// lay id xu ly tren cart
    const cart = useAuth();
	
    const docRef =  getDoc(collection(firestore, "ShoppingCart", cart.uid))
 
    const deleteCart = async (idx) => {
    	try {
      	//get array
			const docSnap = await getDoc(docRef)
			const food_list = docSnap.data()['Food'];
			const quant_list = docSnap.data()['Quantity'];
      	
      	//delete
      	food_list.splice(idx, 1)
      	quant_list.splice(idx, 1) 
      	updateDoc(docRef, {
        	['Food']: food_list,
        	['Quantity']: quant_list
      	})  
    	}catch(err){
			console.error(err);
		}
	}
    return (
        <div className='border rounded-3xl border-black p-2 h-120 px-2 mx-4'>
            <div className='grid grid-cols-4 gap-2 justify-center items-center'>
                {/* Image */}
                <div className='w-fit'>
                    <img src={cake} alt="Food" className='object-cover h-20 w-20 rounded-full' />
                </div>
                {/* Infor */}
                <div className='col-span-2 grid grid-rows-3'>
                    <div className='text-xl font-semibold'>{name}</div>
                    {/* <div className='opacity-40'>Sweet</div> */}
                    <div className='flex flex-row justify-start items-center gap-2 h-full'>
                        <button onClick={handleMinClick}>
                            <FaMinusCircle className='h-5 w-5 text-primary hover:opacity-80'/>
                        </button>
                        <div className='h-6 w-fit border border-black px-2'>{count}</div>
                        <button onClick = {handleAddClick}>
                            <FaPlusCircle className='h-5 w-5 text-primary hover:opacity-80'/>
                        </button>
                    </div>
                </div>
                {/* Price */}
                <div className='text-textColor font-semibold justify-self-end self-end'>
                    {price} VND
                </div>

            </div>
        </div>
    )
}

export default CartCard