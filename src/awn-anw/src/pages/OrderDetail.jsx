import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import payment from '../assets/payment.png'
import { FaUserCircle } from "react-icons/fa";
import OrderSumCard from '../components/OrderSumCard';

const OrderDetail = () => {
  return (
    <>
			<Header />
			<div className='w-full mt-16 pl-6 py-5'>
				<div className="grid grid-cols-3 md:grid-cols-4 w-full gap-4">

					{/* Content */}
					<div className="col-span-3 flex flex-col gap-7">

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
						<div className='flex gap-8 bg-white border w-full p-3 h-fit shadow-sm'>
								<p className='text-textColor font-bold'>Order Summary</p>
						</div>

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
}

export default OrderDetail