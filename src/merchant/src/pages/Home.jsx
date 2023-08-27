import React, { useState, useEffect } from 'react';
import mainpic from "../assets/mainpic.png";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaRegMap } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { firestore } from '../config/firebase'
import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import useAuth from '../custom_hooks/useAuth'

const Home = () => {
  // const user = useAuth();
  const [OneMerchant, setOneMerchant] = useState([])
  const [OrderDetail, setOrder] = useState([])

  // const MerchantCollectionRef = collection(firestore, "Merchant")
  
  const merchant = useAuth();
  const display1Merchant = async(uid) => {
    try{
        const MerchantRef = doc(firestore, "Merchant", uid)
        const docSnap = await getDoc(MerchantRef)
        const merchantData = docSnap.data();
        console.log(merchantData)
        setOneMerchant(merchantData)
    }catch (err){
      console.error(err);
    }
  };
  const getOrder = async(uid) => {
    try{
      const OrderRef = collection(firestore, "Order")
      const q = query(OrderRef, where ("M_ID", "==", uid));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const OrderData = doc.data();
        console.log(OrderData);
        setOrder(OrderData)
      })

    } catch(err){
      console.error(err)
    }
  };


  useEffect(() => {
    if(merchant){
      getOrder(merchant.uid);
    }
  }, [merchant])


  useEffect(() => {
    if(merchant){
      display1Merchant(merchant.uid);
    }
  }, [merchant])



  return (
    <>
        <Header />

        {/* DISPLAY STORE INFORMATION */}
        <div className="grid grid-cols-2 h-full w-full pt-16">
          <div key={OneMerchant.uid} className='grid text-textColor text-left h-2/3 justify-items-start py-28 px-12 my-24 mx-10 gap-y-2 '>
            <p className=' h-fit text-2xl font-semibold mb-8'>
             {OneMerchant.Name}
            </p>

            <p className=' h-fit flex gap-4 text-base'>
              <FaRegMap className=' text-2xl cursor-pointer'/>
              {OneMerchant.Address}
            </p>
            
            <p className=' h-fit flex gap-4 text-base'>
              <FiPhone className=' text-2xl cursor-pointer'/>
              {OneMerchant.Phone}
            </p>
            
            <p className=' h-fit flex gap-4 text-base'>
              <FiMail className=' text-2xl cursor-pointer'/>
              {OneMerchant.email}
            </p>
          </div>
          <div className="hidden md:flex justify-end items-center">
             <img src={mainpic} alt="mainpic" className="h-2/3 object-contain sticky"/>
           </div>  
        </div>
        <Footer />
    </>
  );
};

export default Home