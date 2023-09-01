import React, { useState, useEffect } from "react";
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
  } from "firebase/firestore";
import { firestore } from "../config/firebase";


const Merchant = () => {

    const [merchantList, setMerchantList] = useState([])

    const fetchMerchant = async() => {
        try{
            const MerchantRef = collection(firestore, "Merchant")
            var merchantlist = []
            const docSnap = await getDocs(MerchantRef);
            docSnap.forEach((doc) => {
                const merchant = doc.data() 
                merchantlist.push(merchant)
                // console.log(buyer);
                // setBuyerList(buyer);
            })
            // console.log(merchantList);
            setMerchantList(merchantlist)
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMerchant();
  }, []);

  return (
    <>
        <Header/>    
        <div className='flex flex-col w-full min-h-screen mt-16 gap-2 py-16 px-16'>
            {merchantList && merchantList.map((merchant, index) => {
                return (
                    <div className='w-full h-fit bg-gray grid grid-cols-3 justify-items-start py-2 px-4 gap-4'>
                    <div className='text-base'>{index}</div>
                    <div className='text-base'>{merchantList[index].Name}</div>
                    <div className='text-base'>{merchantList[index].email}</div>
            </div> 
                )
            })}
        </div>
        <Footer/>
    </>
  )
}

export default Merchant