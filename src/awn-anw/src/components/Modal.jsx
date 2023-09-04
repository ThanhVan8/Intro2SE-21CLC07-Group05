import shop from "../assets/shop.png";

import { FaTimes, FaShoppingBasket } from "react-icons/fa";
import {doc,getDoc} from "firebase/firestore";
import { firestore } from "../config/firebase";
import React, { useState, useEffect } from "react";
import useAuth from "../custom_hooks/useAuth";
import CartCard from "./CartCard";
import { useStateValue } from '../context/StateProvider'
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const cart = useAuth();
  const [foods, setFoods] = useState([]);
  const [prices, setPrices] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [description, setDescription] = useState([]);
  const [images, setImages] = useState([]);
  const [merchant, setMerchant] = useState({});

  const fetchCart = async (uid) => {
    try {
      const CartRef = doc(firestore, "ShoppingCart", uid);
      const docSnap = await getDoc(CartRef);

      const food_list = docSnap.data().Food
      setQuantities(docSnap.data().Quantity)

			const merchant_id = docSnap.data().merchant_id;
      const merchantRef = doc(firestore, "Merchant", merchant_id);
      const docSnapMerchant = await getDoc(merchantRef);
      setMerchant(docSnapMerchant.data())

      for (let i = 0; i < food_list.length; i++) {
				const menuRef = doc(firestore, "Menu", merchant_id);
				const docSnap = await getDoc(menuRef);
        setFoods((foods) => [
          ...foods, 
          docSnap.data().FoodList[food_list[i]]
        ]);
        setPrices((prices) => [
          ...prices, 
          docSnap.data().Price[food_list[i]]
        ]);
        setDescription((description) => [
          ...description,
          docSnap.data().Description[food_list[i]],
        ]);
        setImages((images) => [
          ...images, 
          docSnap.data().Image[food_list[i]]
        ]);
			}
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

  const navigate = useNavigate();
  const placeOrder = () => {
    handleCloseModal()
    navigate("/OrderDetail");
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center">
      <div className="relative bg-white max-h-510 border-solid border rounded-lg border-primary py-4 px-2 w-full md:w-[500px]">
        {/* close */}
        <button onClick={handleCloseModal}>
          <FaTimes className="absolute h-5 w-5 text-primary top-4 right-2 pr" />
        </button>

        {foods.length !== 0 ? (
          <>
            {/* Store */}
            <div className="flex flex-col justify-center items-center px-2 h-1/3">
              <img
                src={merchant.Image ? merchant.Image : shop}
                alt="Store"
                className="h-20 w-20 rounded-full object-cover"
              />
              <p className="py-2 font-semibold font-serif capitalize text-xl">{merchant.Name}</p>
              <hr className="w-full border:none border-black border-opacity-30" />
            </div>

            {/* food */}
            <div className="overflow-auto grid grid-cols-1 grid-flow-row justify-center items-center px-2 mb-12 mt-4 max-h-240">
              {foods.map((food, index) => {
                return (
                  <CartCard
                    name={food}
                    quantity={quantities[index]}
                    price={prices[index]}
                    description={description[index]}
                    image={images[index]}
                    idFood={index}
                  />
                );
              })}
            </div>

            {/* button buy */}
            <div className="absolute w-fit flex justify-end bottom-4 right-2 bg-white ">
              <button
                className="w-20 px-4 py-2 mr-2 border border-primary rounded-full bg-primary sticky
									text-textHeadingColor font-semibold hover:opacity-80 font-mono uppercase"
                  onClick={placeOrder}
              >
                buy
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <FaShoppingBasket className="text-9xl text-disabled" />
            <p className="text-disabled font-medium font-mono">Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;