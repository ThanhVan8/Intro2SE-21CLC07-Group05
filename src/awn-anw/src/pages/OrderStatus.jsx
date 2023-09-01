import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import bill from '../assets/bill.png'
import OrderStatusCard from '../components/OrderStatusCard'
import useAuth from '../custom_hooks/useAuth'
import { firestore } from '../config/firebase'
import { doc, getDoc, addDoc, collection, getDocs, query, where } from 'firebase/firestore'



const OrderStatus = () => {
	const [details, setDetails] = useState([
		{name:"Lotteria", id:"12345", status: "Preparing", total: 10000},
		{name:"Lotteria", id:"12345", status: "Preparing", total: 20000},
		{name:"Lotteria", id:"12345", status: "Preparing", total: 20000}])


	const [order, setOrder] = useState([{}])
	const buyer = useAuth();
	var shopList = []
	var statusList = []
	var totalList = []
	var shopNameList = []
	var addressList = []

	const getOrderDetail = async(uid) => {
		try{
			const orderRef = collection(firestore, "Order");
			const q = query(orderRef, where("O_ID", "==", uid));
			const docSnap = await getDocs(q);
			docSnap.forEach((doc) => {
				const orderData = doc.data();
				shopList.push(orderData.M_ID)
				statusList.push(orderData.Status)
				totalList.push(orderData.Total)
			})


			for (let i = 0; i < shopList.length; i++) {
				const shopRef = doc(firestore, "Merchant", shopList[i]);
				const docSnap = await getDoc(shopRef);
				const shopData = docSnap.data();
				shopNameList.push(shopData.Name)
				addressList.push(shopData.Address)
			}

		}catch(err){
			console.error(err);
		}
	}

	useEffect(() => {
		if(buyer){
			getOrderDetail(buyer.uid);
		}
	}, [buyer]);
  return (
    <>
			<Header />
			<div className='w-full mt-24 px-12 md:pr-0 py-5 min-h-screen'>
				<div className="grid grid-cols-3 md:grid-cols-4 w-full gap-4">
					{/* Content */}
					<div className="col-span-3 flex flex-col gap-7 items-start">
						{details.map((detail) => {
							return (
								<OrderStatusCard name={detail.name} id={detail.id} status={detail.status} total={detail.total} />
						)})}
					</div>

					{/* Picture */}
					<div className="hidden md:flex justify-end items-center">
						<img
							src={bill}
							alt="mainpic"
							className="h-3/4 object-contain sticky"
						/>
					</div>
				</div>
			</div>
			<Footer />
    </>
  )
}

export default OrderStatus