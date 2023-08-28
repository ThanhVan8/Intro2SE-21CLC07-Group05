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
  const [nameMerchant, setNameMerchant] = useState()
  const fetchMenu = async(uid) => {
    try{
      const MenuRef = doc(firestore, "Menu", uid) // cai cho nay, thuc hien vao nha hang, lay uid do thay vao cai chuoi dai trong cmt kia
      const docSnap = await getDoc(MenuRef);
      const MerchantRef = doc(firestore, "Merchant", id)
      const docSnap2 = await getDoc(MerchantRef);
      setNameMerchant(docSnap2.data().Name)
      // console.log(nameMerchant)
      // console.log(docSnap.data());
      setMenuData(docSnap.data())
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu(id);
  },[id])

  // const [{ addFoodShow }, dispatch] = useStateValue()

  return (
    <>
      <Header />
      <div className='ml-4 mt-20 mb-8'>
        <div className='grid grid-cols-2 md:grid-cols-3 w-full h-fit gap-4'>
          <div className="grid col-span-2 gap-4 px-5">
          {/* <div className="flex flex-col justify-center items-center mb-8 sticky "> */}
          {/* <div className="flex flex-col  items-center mb-8 gap-2 "> */}
            {menuData && menuData.FoodList.map((data, index) => {
              return (
                <MenuCard index={index} 
                foodName={data} 
                foodDescription={menuData.Description[index]}
                foodPrice={menuData.Price[index]}
                idMerchant={id}/>
              )
            })}
            </div>
            <div className='hidden md:flex justify-end items-center'>
              <div className=''>
                <img
                    src={menupic}
                    alt="menupic"
                    className="h-full object-contain sticky pl-5"
                  />
                <p className='text-xl font-bold text-center pl-24'>{nameMerchant}</p>
              </div>
            </div>
        </div>

      </div>
      <Footer />

    </>
  )
}

export default Menu