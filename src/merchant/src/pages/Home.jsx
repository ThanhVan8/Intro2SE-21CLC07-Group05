import React, { useState, useEffect } from 'react';
import mainpic from "../assets/mainpic.png";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaRegMap } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { firestore } from '../config/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import useAuth from '../custom_hooks/useAuth'

const Home = () => {
  // const user = useAuth();
  const [OneMerchant, setOneMerchant] = useState([])
  const MerchantCollectionRef = collection(firestore, "Merchant")

  const display1Merchant = async() => {
    try{
      const auth = getAuth();
      const merchant = auth.currentUser;
      const q = query(MerchantCollectionRef, where("uid", "==", merchant.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const merchantData = doc.data();
        setOneMerchant(merchantData)
      })
    }catch (err){
      console.error(err);
    }
  };

  useEffect(() => {
    display1Merchant();
  }, [])

  return (
    <>
        <Header />

        {/* DISPLAY STORE INFORMATION */}
        <div className="grid grid-cols-2 w-full h-full pt-16">
          <div key={OneMerchant.n_id} className='grid text-textColor text-left h-2/3 justify-items-start py-28 px-12 my-24 mx-10 gap-y-2'>
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