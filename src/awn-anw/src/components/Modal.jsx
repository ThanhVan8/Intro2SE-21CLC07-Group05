import storepic from "../assets/store.jpg";

import { FaTimes, FaShoppingBasket } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import {addDoc,setDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import React, { useState, useEffect } from "react";
import useAuth from "../custom_hooks/useAuth";
import CartCard from "./CartCard";
import { useStateValue } from '../context/StateProvider'

const Modal = () => {
  // const auth = getAuth();
  // const cart = auth.currentUser;
  const cart = useAuth();
  const [shoppingCart, setShoppingCart] = useState({});


  // // phan nay add m_id (khoi tao )
  // const docRef =  setDoc(collection(firestore, "ShoppingCart", cart.uid), {
  //   Food: [],
  //   Quantity: [],
  //   merchant_id: m_id
  //   });
  // //
  

  // const deleteCart = async (idx) => {
  //   try {
  //     //get array
  //     const docSnap = await getDoc(docRef)
	// 		const food_list = docSnap.data()['Food'];
	// 		const quant_list = docSnap.data()['Quantity'];
      
				
  //     //delete
  //     food_list.splice(idx, 1)
  //     quant_list.splice(idx, 1) 
  //     updateDoc(docRef, {
  //       ['Food']: food_list,
  //       ['Quantity']: quant_list
  //     })  
  //   }catch(err){
	// 		console.error(err);
	// 	}
  // }

  const fetchCart = async (uid) => {
    try {
      const CartRef = doc(firestore, "ShoppingCart", uid);
      const docSnap = await getDoc(CartRef);
      console.log(docSnap.data());
      setShoppingCart(docSnap.data());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (cart) {
      fetchCart(cart.uid);
    }
  }, [cart]);

  const [{ cartShow }, dispatch] = useStateValue()
  const handleCloseModal = () => {
    dispatch({
      type: 'SET_CART_SHOW',
      cartShow: !cartShow,
    })
	}

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-white flex justify-center items-center">
      <div className="relative bg-white max-h-510 w-1/3 border-solid border rounded-lg border-primary py-4 px-2">
        {/* close */}
        <button onClick={handleCloseModal}>
          <FaTimes className="absolute h-5 w-5 text-primary top-4 right-2 pr" />
        </button>

        {shoppingCart ? (
          <>
            {/* Store */}
            <div className="flex flex-col justify-center items-center px-2 h-1/3">
              <img
                src={storepic}
                alt="Store"
                className="h-20 w-20 rounded-full object-cover"
              />
              <p className="py-2 font-semibold"> STORE NAME</p>
              <hr className="w-full border:none border-black border-opacity-30" />
            </div>

            {/* food */}
            <div className="overflow-auto grid grid-cols-1 gap-4 grid-flow-row justify-center items-center px-2 mb-12 mt-4 max-h-240 ">
              {/* {cartDetail.map((food, index) => {
                return (
                  <CartCard
                    name={food.name}
                    quantity={food.quantity}
                    price={food.price}
                    idFood={index}
                  />
                );
              })} */}
            </div>

            {/* button buy */}
            <div className="absolute w-fit flex justify-end bottom-4 right-2 bg-white ">
              <button
                className="w-20 px-4 py-2 mr-2 border border-primary rounded-full bg-primary sticky
									text-textHeadingColor font-semibold hover:opacity-80"
              >
                BUY
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <FaShoppingBasket className="text-9xl text-disabled" />
            <p className="text-disabled font-medium">Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;