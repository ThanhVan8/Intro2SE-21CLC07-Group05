import React, { useState, useEffect } from 'react';
import mainpic from "../assets/mainpic.png";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaRegMap } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { firestore } from '../config/firebase'
import { collection, getDocs, getCountFromServer } from 'firebase/firestore'



const Home = () => {

  const [merchantDetails, setMerchantDetails] = useState([])
  const MerchantCollectionRef = collection (firestore, "Merchant")

  useEffect(() => {
    const getMerchantDetails = async () => {
      try{
        const data = await getDocs(MerchantCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log(filteredData);
      } catch (err){
        console.error(err);
      }
    };
    getMerchantDetails();
  }, [])
  return (
    <>
        <Header />

        {/* DISPLAY STORE INFORMATION */}
        <div className="grid grid-cols-2 h-screen w-full pt-16">
          
            <div className='grid text-textColor text-left h-2/3 justify-items-start py-28 px-12 my-24 mx-10 gap-y-2 '>
              <p className=' h-fit text-2xl font-semibold mb-8'>
                STORE NAME
              </p>
              <p className=' h-fit flex gap-4 text-base'>
                <FaRegMap className=' text-2xl cursor-pointer'/>
                Address
              </p>
              <p className=' h-fit flex gap-4 text-base'>
                <FiPhone className=' text-2xl cursor-pointer'/>
                Phone number
              </p>
              <p className=' h-fit flex gap-4 text-base'>
                <FiMail className=' text-2xl cursor-pointer'/>
                Mail
              </p>
            </div>

            <div className="hidden md:flex justify-end items-center">
              <img src={mainpic}  alt="mainpic"   className="h-2/3 object-contain fixed"/>
            </div>    
        </div>
        
        <Footer />
    </>
  );
};

export default Home