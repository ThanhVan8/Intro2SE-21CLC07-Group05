
import storepic from "../assets/store.jpg"
import cake from "../assets/cake.jpg"
import {FaTimes, FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import React, { useState, useEffect } from 'react';
import useAuth from '../custom_hooks/useAuth'

const Modal = () => {
    // const auth = getAuth();
    // const cart = auth.currentUser;
    const cart = useAuth();
    const[Cart, setShoppingCart] = useState([]);
    
    const fetchCart = async(uid) => {
        try{
            const CartRef = doc(firestore, "ShoppingCart", uid);
            const docSnap = await getDoc(CartRef);
            console.log(docSnap.data());
        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        if (cart) {
            fetchCart(cart.uid);
        }
    }, [cart])

    const [count, setCount] = useState(0);

    function handleAddClick() {
      setCount(count + 1);
    }

    function handleMinClick() {
        if(count>1)
            setCount(count - 1);
    }

  return (
    <div className='fixed inset-0 bg-opacity-50 bg-white flex justify-center items-center'>
        <div className="relative bg-white max-h-510 w-1/3 border-solid border rounded-lg border-primary py-4 px-2">
            {/* close */}
            <button>
                <FaTimes className='absolute h-5 w-5 text-primary top-4 right-2 pr' />
            </button>
            {/* Store */}
            <div className='flex flex-col justify-center items-center px-2 h-1/3'> 
                <img src={storepic} 
                     alt="Store" 
                     className='h-20 w-20 rounded-full object-cover'/>
                <p className='py-2 font-semibold'> STORE NAME</p>
                <hr className= 'w-full border:none border-black border-opacity-30'/>
            </div>
            {/* food */}
            <div className='overflow-auto grid grid-cols-1 gap-4 grid-flow-row justify-center items-center px-2 mb-12 mt-4 max-h-240 '>
                <div className='border rounded-3xl border-black p-2 h-120 px-2 mx-4'>
                    <div className='grid grid-cols-4 gap-2 justify-center items-center'>
                        {/* Image */}
                        <div className='w-fit'>
                            <img src={cake} alt="Food" className='object-cover h-20 w-20 rounded-full' />
                        </div>
                        {/* Infor */}
                        <div className='col-span-2 grid grid-rows-3'>
                            <div className='text-xl font-semibold'>Chesse cake</div>
                            <div className='opacity-40'>Sweet</div>
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
                            30.000 VND
                        </div>

                    </div>

                    
                </div>

                <div className='border rounded-3xl border-black p-2 h-120 px-2 mx-4'>
                    <div className='grid grid-cols-4 gap-2 justify-center items-center'>
                        {/* Image */}
                        <div className='w-fit'>
                            <img src={cake} alt="Food" className='object-cover h-20 w-20 rounded-full' />
                        </div>
                        {/* Infor */}
                        <div className='col-span-2 grid grid-rows-3'>
                            <div className='text-xl font-semibold'>Chesse cake</div>
                            <div className='opacity-40'>Sweet</div>
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
                            30.000 VND
                        </div>

                    </div>

                    
                </div>

                <div className='border rounded-3xl border-black p-2 h-120 px-2 mx-4'>
                    <div className='grid grid-cols-4 gap-2 justify-center items-center'>
                        {/* Image */}
                        <div className='w-fit'>
                            <img src={cake} alt="Food" className='object-cover h-20 w-20 rounded-full' />
                        </div>
                        {/* Infor */}
                        <div className='col-span-2 grid grid-rows-3'>
                            <div className='text-xl font-semibold'>Chesse cake</div>
                            <div className='opacity-40'>Sweet</div>
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
                            30.000 VND
                        </div>

                    </div>

                    
                </div> 
                             
                
            </div>
            
            {/* button buy */}
            <div className='absolute w-fit flex justify-end bottom-4 right-2 bg-white '>
                <button className='w-20 px-4 py-2 mr-2 border border-primary rounded-full bg-primary sticky
                 text-textHeadingColor font-semibold hover:opacity-80'> 
                    BUY
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default Modal
