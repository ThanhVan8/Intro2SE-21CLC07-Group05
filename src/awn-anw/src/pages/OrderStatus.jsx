import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import bill from '../assets/bill.png'
import OrderStatusCard from '../components/OrderStatusCard'
import { useState } from 'react';

const OrderStatus = () => {
	const [details, setDetails] = useState([
		{name:"Lotteria", id:"12345", status: "Preparing", total: 10000},
		{name:"Lotteria", id:"12345", status: "Preparing", total: 20000},
		{name:"Lotteria", id:"12345", status: "Preparing", total: 20000}])
  return (
    <>
			<Header />
			<div className='w-full mt-16 p-6 md:pr-0 py-5'>
				<div className="grid grid-cols-3 md:grid-cols-4 w-full gap-4">
					{/* Content */}
					<div className="col-span-3 flex flex-col gap-7 items-center">
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