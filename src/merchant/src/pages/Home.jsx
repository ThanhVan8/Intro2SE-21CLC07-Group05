import React, { useState, useEffect } from 'react';
import mainpic from "../assets/mainpic.png";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaRegMap } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { firestore } from '../config/firebase'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getCountFromServer, getDoc, getUserData, query, where } from 'firebase/firestore'



const Home = () => {

  const [merchantDetails, setMerchantDetails] = useState([])
  // const [OneMerchant, setOneMerchant] = useState([])
  const MerchantCollectionRef = collection(firestore, "Merchant")
  

  const getMerchantDetails = async () => {
    try{
      const data = await getDocs(MerchantCollectionRef)
      const snapshot = await getCountFromServer(MerchantCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setMerchantDetails(filteredData);
      // console.log(filteredData);
    } catch (err){
      console.error(err);
    }
  };

  const display1Merchant = async() => {
    try{
      // const data = await getDoc(MerchantCollectionRef);
      const auth = getAuth();
      const merchant = auth.currentUser;
      // console.log(merchant.uid);
      const q = query(MerchantCollectionRef, where("uid", "==", merchant.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        //Xuat cac thong tin theo yeu cau
        // console.log("Name:" , doc.data().Name);
        // console.log("Address", doc.data().Address);
        // console.log("Phone: ", doc.data().Phone);
        //xuat het, cac thong tin se duoc luu vao bien merchantData
        const merchantData = doc.data();
        console.log(merchantData);
        // setMerchantDetails(filteredData);
      })
    }catch (err){
      console.error(err);
    }
  };


  useEffect(() => {
    getMerchantDetails();
  }, [])

  useEffect(() => {
    display1Merchant();
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