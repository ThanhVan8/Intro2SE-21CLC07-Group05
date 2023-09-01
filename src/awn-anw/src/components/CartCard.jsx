import React from 'react'
import { useState, useEffect } from 'react';
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

import logo from "../assets/logo.png"

import {addDoc,setDoc,collection,getDocs,query,where,doc,getDoc,updateDoc, arrayRemove} from "firebase/firestore";
import { firestore } from "../config/firebase";
import useAuth from "../custom_hooks/useAuth";

const CartCard = ({name, quantity, price, description, image, idFood}) => {
    const [count, setCount] = useState(quantity);
    function handleAddClick() {
      setCount(count + 1);
    }
    function handleMinClick() {
        if(count >= 1)
            setCount(count - 1);
        if(count === 0)
            deleteFood(cart.uid);
    }

    const cart = useAuth();
    const updateQuant = async(uid) => {
        try {
            const CartRef = doc(firestore, "ShoppingCart", uid);
            const docSnap = await getDoc(CartRef);
            var quantity_list = docSnap.data()['Quantity']
            quantity_list[idFood] = count
            await updateDoc(CartRef, {
                Quantity: quantity_list
            })
        } catch (err) {
            console.error(err)
        }
    }

    const deleteFood = async(uid) => {
        try{
            const CartRef = doc(firestore, "ShoppingCart", uid);
            const docSnap = await getDoc(CartRef);
            var food_list = docSnap.data()['Food']
            var quantity_list = docSnap.data()['Quantity']
            food_list.splice(idFood, 1)
            quantity_list.splice(idFood, 1)  
            console.log(food_list)
            console.log(quantity_list)

            await updateDoc(CartRef, {
                Food: food_list,
                Quantity: quantity_list
            })
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        if(cart)
            updateQuant(cart.uid)
    }, [cart, count]);
    
    return (
        <div className='border rounded-3xl border-black p-2 h-120 px-2 mx-4'>
            <div className='grid grid-cols-4 gap-2 justify-center items-center'>
                {/* Image */}
                <div className=''>
                    <img src={image ? image : logo} alt="Food" className='object-cover h-14 w-14 rounded-full' />
                </div>
                {/* Infor */}
                <div className='col-span-2 grid grid-rows-2 gap-2'>
                    <div>
                        <p className='text-base font-semibold'>{name}</p>
                        <p className=''>{description}</p>
                    </div>
                    
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
                <div className='text-textColor font-semibold text-base justify-self-end self-end'>
                    {price*count} VND
                </div>

            </div>
        </div>
    )
}

export default CartCard