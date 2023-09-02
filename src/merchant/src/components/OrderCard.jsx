import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAuth } from 'firebase/auth'
import { firestore } from '../config/firebase'
import useAuth from '../custom_hooks/useAuth'
import { collection, getDoc, getDocs, updateDoc, where, query } from 'firebase/firestore'

const OrderCard = ({detail, buyerInfo}) => {
	const [order, setOrder] = useState(detail)
	const [buyer, setBuyer] = useState(buyerInfo)
	const [status, setStatus] = useState(detail.Status)
    
    // const merchant = useAuth();
    // const orderr = useAuth();
	const handleClickStatus = (statusName) => {
		setOrder({...order, Status: statusName})
        
	}
    // console.log(order.id)
  return (
    <div className='w-full h-fit grid grid-rows-5 justify-items-start px-4 gap-2 bg-gray text-base'>
        <div className ='w-full flex justify-between items-center gap-4 py-2 text-lg'>
            <div className='font-semibold'>ID</div>
            <div >{order.id}</div>

        </div>
 
        <div className='w-full h-fit grid grid-cols-6 justify-items-start gap-4 row-span-3'>
					<div className='w-full col-span-3 grid grid-cols-1 gap-2'>
            {order && order.Food.map((foodDetail, index) => {
							return (
									<div key={index} className='w-full flex justify-items-start gap-8 items-center'>
											<div className='text-base'>{order.Quantity[index]}x</div>
											<div className='text-base'>{foodDetail}</div>
									</div>             
							)
						})}
					</div>
            <div className='w-full col-span-2 flex-col px-4'>
							{buyer &&
								<>
									<div className='text-base font-semibold'>{buyer.Name}</div>
									<div className='text-base '>{buyer.Phone}</div>
									<div className='text-base '>{buyer.Address}</div>
								</>}
            </div>

            {order &&
            <div className='w-full grid grid-rows-3 justify-end '>
                <label className='p-2 flex gap-2 '>
                    <input  type="radio" 
                            className="w-4 h-4"
                            checked={order.Status === 'Preparing'}
														onClick={() => handleClickStatus('Preparing')} />
                    <span> Preparing </span>
                </label>
                <label className='p-2 flex gap-2 '>
                    <input  type="radio" 
                            className=" w-4 h-4" 
														checked={order.Status === 'Delivering'}
														onClick={() => handleClickStatus('Delivering')} />
                    <span> Delivering </span>
                </label>

                <label className='p-2 flex gap-2 '>
                    <input  type="radio" 
                            className="w-4 h-4" 
														checked={order.Status === 'Delivered'}
														onClick={() => handleClickStatus('Delivered')}/>

                    <span> Delivered </span>
                </label>
            </div>
            }
        </div>
        
        {order &&
        <div className='w-full flex justify-between'>
            <div className='text-base font-semibold'>Price</div>
            <div className='text-base'>{order.Total}</div>
        </div>}
    </div>
  )
}

export default OrderCard