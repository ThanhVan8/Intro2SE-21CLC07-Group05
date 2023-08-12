import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import payment from '../assets/payment.png'
import { FaUserCircle } from "react-icons/fa";

const OrderDetail = () => {
  return (
    <>
        <Header />
        <div className='w-full mt-16 pl-6'>
            <div className="grid grid-cols-3 md:grid-cols-4 w-full h-fit gap-4">
                <div className="col-span-3 flex">
                    {/* User info */}
                    <div className='flex gap-2 bg-white border w-full p-3'>
											{/* avatar */}
											<div className=''>
												<FaUserCircle className='text-4xl text-textColor'/>
											</div>
											{/* info */}
											<label>
												Address
												<input type="text" defaultValue="Name" className="border-b-2 border-textColor w-full disabled"/>
											</label>
											<div>

											</div>
                    </div>
                </div>
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