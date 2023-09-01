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



const Customer = () => {

    const [buyerList, setBuyerList] = useState([])

    const fetchBuyer = async() => {
        try{
            const BuyerRef = collection(firestore, "User")
            const docSnap = await getDocs(BuyerRef);
            docSnap.forEach((doc) => {
                const buyer = doc.data() 
                console.log(buyer);
                setBuyerList(buyer);
            })
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchBuyer();
  }, []);

    return (
    <>
        <Header/>    
        <div className='flex flex-col w-full min-h-screen mt-16 gap-2 py-16 px-16'>
            {buyerList && buyerList.map((buyer, index) => {
                return (
                    <div className='w-full h-fit bg-gray grid grid-cols-3 justify-items-start py-2 px-4 gap-4'>
                        <div className='text-base font-mono'>{index}</div>
                        <div className='text-base font-mono'>{buyer.Name}</div>
                        <div className='text-base font-mono'>{buyer.email}</div>
                    </div> 
                )
            })}
        </div>
        <Footer/>
    </>
  )
}

export default Customer