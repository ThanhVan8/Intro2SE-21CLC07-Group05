import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import payment from '../assets/payment.png'
import { FaUserCircle, FaShoppingBasket } from "react-icons/fa";
import OrderSumCard from '../components/OrderSumCard';
import useAuth from '../custom_hooks/useAuth'
import { doc, getDoc, addDoc, collection } from 'firebase/firestore'
import { firestore } from '../config/firebase'

const OrderDetail = () => {
	const [details, setDetails] = useState([
		{name:"Cheese cake", description:"Sweet", quantity:3, price:10000},
		{name:"Chicken", description:"Sweet", quantity:2, price:20000},
		{name:"Chicken", description:"Sweet", quantity:2, price:20000}]
	)
	const [order, setOrder] = useState([{}])

	const[shoppingCart, setShoppingCart] = useState({});
	const buyer = useAuth();
	// const fetchCart = async(uid) => {
	// 	try{
	// 		const CartRef = doc(firestore, "ShoppingCart", uid);
	// 		const docSnap = await getDoc(CartRef);
	// 		// console.log(docSnap.data());
	// 		setShoppingCart(docSnap.data());
	// 	} catch(err) {
	// 		console.error(err);
	// 	}
	// };
	
  	// useEffect(() => {
	// 	if (buyer) {
	// 		fetchCart(buyer.uid);
	// 	}
	// }, [buyer]);
	const foodlist = []
	const deslist = []
	const pricelist = []
	var quantity_list = []
	var merchant_id = ""
	const handlePlaceOrder = async( uid) => {
		try{
			//fetch data from categories
			const OrderRef = doc(firestore, "ShoppingCart", uid);
			const docSnap = await getDoc(OrderRef);
			
			const food_list = docSnap.data()['Food'];
			quantity_list = docSnap.data()['Quantity'];
			merchant_id = docSnap.data().merchant_id;
			console.log(merchant_id);

			

			for (let i = 0; i < food_list.length; i++) {
				const menuRef = doc(firestore, "Menu", merchant_id);
				const docSnap = await getDoc(menuRef);
				const food = docSnap.data().FoodList[i];
				const description = docSnap.data().Description[i];
				const price = docSnap.data().Price[i];
				foodlist.push(food);
				deslist.push(description);
				pricelist.push(price);
			}

			console.log(foodlist);
			console.log(deslist);
			console.log(pricelist);

			//making order, set to order collection
			var sum = 0
			for (let i = 0; i < pricelist.length; i++) {
				sum += Number(pricelist[i]) * Number(quantity_list[i])
			}
			console.log(sum)
			const docRef = await addDoc(collection(firestore, "Order"), {
				Food: foodlist,
				M_ID: merchant_id,
				O_ID: buyer.uid,
				Quantity: quantity_list,
				Status: "Preparing",
				Total: sum
			  });
			
		}catch(err){
			console.error(err);
		}
	};

	useEffect(() => {
		if (buyer) {
			handlePlaceOrder(buyer.uid);
		}
	}, [buyer]);




	// useEffect(() => {
	// 	handlePlaceOrder()
	// })
  return (
    <>
			<Header />
			<div className='w-full mt-16 p-6 md:pr-0 py-5'>
				<div className="grid grid-cols-3 md:grid-cols-4 w-full gap-4">

					{/* Content */}
					<div className="col-span-3 flex flex-col gap-7 items-center">

						{/* User info */}
						<div className='flex gap-8 bg-white border w-full p-3 h-fit shadow-sm'>
							{/* avatar */}
							<div className='flex flex-col justify-center'>
								<FaUserCircle className='text-4xl text-textColor'/>
								<p>Name</p>
							</div>
							{/* info */}
							<div className='flex flex-col gap-4 w-full'>
								<label className='space-y-2'>
									<p className='text-textColor font-semibold'>Address</p>
									<input type="text" defaultValue="abc" className="border-b-2 border-black w-full outline-none text-gray-500" readOnly />
								</label>
								<label className='space-y-2'>
									<p className='text-textColor font-semibold'>Phone number</p>
									<input type="text" defaultValue="0123456789" className="border-b-2 border-black w-full outline-none text-gray-500" readOnly />
								</label>
							</div>
						</div>

						{/* Order summary */}
						<div className='flex flex-col gap-3 bg-white border w-full p-3 h-fit shadow-sm'>
							<p className='text-textColor font-bold'>Order Summary</p>
							{foodlist ? 
							<>
								{foodlist.map((food, index) => {
									return (
										<OrderSumCard name={food} description={deslist[index]} quantity={quantity_list[index]} price={pricelist[index]} />
									)
								})} 
								<div className='flex justify-between mt-2'>
									<p className='text-textColor'>Shipping fee</p>
									<p className='text-textColor'>20000 VND</p>
								</div>
								<div className='flex justify-between'>
									<p className='text-textColor'>Total</p>
									<p className='text-textColor font-semibold'>100000 VND</p>
								</div>
							</>
							:
							<div className='flex flex-col items-center'>
								<FaShoppingBasket className='text-9xl text-disabled'/>
								<p className='text-disabled font-medium'>Your cart is empty</p>
							</div>}
						</div>
						{/* Button */}
						<button className="w-fit px-4 py-2.5 bg-primary text-white font-medium rounded-3xl hover:opacity-75"
						onClick={e => handlePlaceOrder(e)}>
              Place order
            </button>
					</div>
					
					{/* Picture */}
					<div className="hidden md:flex justify-end items-center">
						<img
							src={payment}
							alt="mainpic"
							className="h-3/4 object-contain sticky"
						/>
					</div>
				</div>
			</div>
			<Footer />
    	</>
  	)
};

export default OrderDetail