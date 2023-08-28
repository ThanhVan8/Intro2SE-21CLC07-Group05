import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAuth } from 'firebase/auth'
import { firestore } from '../config/firebase'
import useAuth from '../custom_hooks/useAuth'
import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore'
import OrderCard from '../components/OrderCard';

const Order = () => {

    const [OrderDetail, setOrder] = useState([])
    const [BuyerDetail, setBuyer] = useState([])
    const merchant = useAuth();
    let u_id = []
    const getOrder = async(uid) => {
        try{
          const OrderRef = collection(firestore, "Order")
          const q = query(OrderRef, where ("M_ID", "==", uid));
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {
            const OrderData = doc.data();
            console.log(OrderData);
            setOrder(OrderData);
            u_id.push(OrderData.O_ID);
          })
          for (let i = 0; i < u_id.length; i++){
            const BuyerRef = doc(firestore, "User", u_id[i])
            const docSnap = await getDoc(BuyerRef)
            const buyer = docSnap.data();
            setBuyer([
                ...BuyerDetail,
                {buyer} // need to check here
            ]);
            console.log(buyer);
          }
        } catch(err){
          console.error(err)
        }
      };

    useEffect(() => {
        if(merchant){
            getOrder(merchant.uid);
            console.log(merchant.uid)
        }
    }, [merchant])
    return (
    <>
        <Header/>
        {/* container */}
        <div className='w-full h-full mt-16 py-16 px-16 grid gap-4'>
            {/* an order */}
            <OrderCard/>
        </div>
        <Footer/>
    
    </>
  )
}

export default Order