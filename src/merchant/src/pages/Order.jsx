import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAuth } from 'firebase/auth'
import { firestore } from '../config/firebase'
import useAuth from '../custom_hooks/useAuth'
import { collection, getDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'


const Order = () => {

    const [OrderDetail, setOrder] = useState([])
    const [BuyerDetail, setBuyer] = useState([])
    const [updatedStatus, setUpdatedStatus] = useState()
    const merchant = useAuth();
    const getOrder = async(uid) => {
        try{
          const OrderRef = collection(firestore, "Order")
          const q = query(OrderRef, where ("M_ID", "==", uid));
          const querySnapshot = await getDocs(q)
          let u_id = [];
          let orderList = [];
          let buyerList = [];
          querySnapshot.forEach((doc) => {
            const OrderData = doc.data();
            console.log(OrderData);
            orderList.push(OrderData);
            u_id.push(OrderData.O_ID);
          })
          for (let i = 0; i < u_id.length; i++){
            const BuyerRef = doc(firestore, "User", u_id[i])
            const docSnap = await getDoc(BuyerRef)
            const buyer = docSnap.data();
            buyerList.push(buyer);
          }
          console.log(buyerList);
        } catch(err){
          console.error(err)
        }
      };

    useEffect(() => {
        if(merchant){
            getOrder(merchant.uid);
        }
    }, [merchant])

    // tvan lấy id của order cần phải update
    // const updateOrder = async(id) => {
    //     const OrderDoc = doc(firestore, "Order", id);
    //     await updateDoc(OrderDoc, {Status: updatedStatus});
    // }

    

    return (
    <>
        <Header/>
        {/* container */}
        <div className='w-full min-h-screen mt-16 py-16 px-16 grid gap-4'>
            {/* an order */}
            <div className='w-full h-fit grid grid-rows-5 justify-items-start px-4 gap-2 bg-gray'>
                <div className ='w-full flex justify-between items-center gap-4 py-2'>
                    <div className='text-base font-semibold'>ID</div>
                    <div className='text-base'>12345678</div>
                </div>

                <div className='w-full h-fit grid grid-cols-6 justify-items-start gap-4 row-span-3'>
                    {/* Food */}
                    <div className='w-full col-span-3 grid grid-cols-1 gap-2'>
                        <div className='w-full flex justify-items-start gap-8 items-center'>
                            <div className='text-base'>1x</div>
                            <div className='text-base'>Khoai tay lac</div>
                        </div>    
                                       
                    </div>
                    {/* Cus in4 */}
                    <div className='w-full col-span-2 flex-col px-4'>
                        <div className='text-base font-semibold'>Nguyen Van A</div>
                        <div className='text-base '>0123456789</div>
                        <div className='text-base '>abc xyz kml</div>
                    </div>
                    {/* check box */}
                    <div className='w-full grid grid-rows-3 justify-end '>
                        <label className='p-2 flex gap-2 '>
                            <input  type="checkbox" 
                                    class="w-4 h-4" />
                            <span> Preparing </span>
                        </label>
                        <label className='p-2 flex gap-2 '>
                            <input  type="checkbox" 
                                    class=" w-4 h-4" />
                            <span> Delivering </span>
                        </label>

                        <label className='p-2 flex gap-2 '>
                            <input  type="checkbox" 
                                    class="w-4 h-4" />
                            <span> Delivered </span>
                        </label>
                    </div>
                </div>

                <div className='w-full flex justify-between'>
                    <div className='text-base font-semibold'>Price</div>
                    <div className='text-base'>120.000</div>
                </div>
            </div>
            
            
        </div>
        <Footer/>
    
    </>
  )
}

export default Order