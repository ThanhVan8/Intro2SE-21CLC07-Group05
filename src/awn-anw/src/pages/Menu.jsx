import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import menupic from "../assets/menupic.png";
import cake from "../assets/cake.jpg";
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../config/firebase';
import {useParams} from "react-router-dom"
import MenuCard from '../components/MenuCard';
import { useStateValue } from '../context/StateProvider'
import AddModal from "../components/AddModal";

const Menu = () => {
  const { id } = useParams();
  // const MenuRef = doc(firestore, "Menu", id) // cai cho nay, thuc hien vao nha hang, lay uid do thay vao cai chuoi dai trong cmt kia
  const [menuData, setMenuData] = useState()
  const [merchant, setMerchant] = useState({})
  const fetchMenu = async(uid) => {
    try{
      const MenuRef = doc(firestore, "Menu", uid) // cai cho nay, thuc hien vao nha hang, lay uid do thay vao cai chuoi dai trong cmt kia
      const MerchantRef = doc(firestore, "Merchant", uid)
      const docSnap = await getDoc(MenuRef);
      setMenuData(docSnap.data())

      const docSnap2 = await getDoc(MerchantRef);
      setMerchant(docSnap2.data())
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    if(id){
      fetchMenu(id);
    }
  },[id])

  return (
    <>
      <Header />
      <div className='ml-4 mt-28 mb-12 min-h-screen'>
        <div className='p-5 flex flex-col gap-3 shadow-[10px_5px_5px_0_rgba(0,0,0,0.1)]'>
          <p className='text-3xl font-semibold font-serif'>{merchant.Name}</p>
          <p className='text-base'>{merchant.Address}</p>
          <p className='text-base'>{merchant.Phone}</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 w-full h-fit gap-4 pt-5'>
          <div className="grid col-span-2 gap-4 px-5">
          {/* <div className="flex flex-col justify-center items-center mb-8 sticky "> */}
          {/* <div className="flex flex-col  items-center mb-8 gap-2 "> */}
            {menuData && menuData.FoodList.map((data, index) => {
              return (
                <MenuCard index={index} 
                foodName={data} 
                foodDescription={menuData.Description[index]}
                foodPrice={menuData.Price[index]}
                foodImg={menuData.Image[index]}
                idMerchant={id}/>
              )
            })}
            </div>
            <div className='hidden md:flex justify-end items-center'>
              <div className=''>
                <img
                    src={menupic}
                    alt="menupic"
                    className="h-full object-contain sticky pl-5 opacity-90"
                  />
                <p className='text-3xl font-serif font-semibold text-center pl-24 py-2'>{merchant.Name}</p>
              </div>
            </div>
        </div>

      </div>
      <Footer />

    </>
  )
}

export default Menu