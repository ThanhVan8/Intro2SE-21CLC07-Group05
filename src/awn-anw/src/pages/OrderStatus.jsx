import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import bill from '../assets/bill.png'
import OrderStatusCard from '../components/OrderStatusCard'
import useAuth from '../custom_hooks/useAuth'
import { firestore } from '../config/firebase'
import { doc, getDoc, addDoc, collection, getDocs, query, where } from 'firebase/firestore'

const OrderStatus = () => {
	const buyer = useAuth();
	// var shopList = []
	// var statusList = []
	// var totalList = []
	// var shopNameList = []
	// var addressList = []
	var tempList = []

	const [shopList, setShopList] = useState([])
	const [statusList, setStatusList] = useState([])
	const [totalList, setTotalList] = useState([])
	const [shopNameList, setShopNameList] = useState([])
	const [addressList, setAddressList] = useState([])

	useEffect(() => {
		if(buyer){
			const getOrderDetail = async(uid) => {
				try{
					const orderRef = collection(firestore, "Order");
					const q = query(orderRef, where("O_ID", "==", uid));
					const docSnap = await getDocs(q);
					docSnap.forEach((doc) => {
						const orderData = doc.data();
						tempList.push(orderData.M_ID)
						// statusList.push(orderData.Status)
						// totalList.push(orderData.Total)
						setShopList(shopList => [...shopList, orderData.M_ID])
						setStatusList(statusList => [...statusList, orderData.Status])
						setTotalList(totalList => [...totalList, orderData.Total])
					})
		
					for (let i = 0; i < tempList.length; i++) {
						const shopRef = doc(firestore, "Merchant", tempList[i]);
						const docSnap = await getDoc(shopRef);
						const shopData = docSnap.data();
						// shopNameList.push(shopData.Name)
						// addressList.push(shopData.Address)
						setShopNameList(shopNameList => [...shopNameList, shopData.Name])
						setAddressList(addressList => [...addressList, shopData.Address])
					}
					console.log(shopNameList)
					console.log(addressList)
		
				}catch(err){
					console.error(err);
				}
			}

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
						{shopNameList.map((detail, index) => {
							return (
								<OrderStatusCard name={detail} address={addressList[index]} status={statusList[index]} total={totalList[index]} />
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