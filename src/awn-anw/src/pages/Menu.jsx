import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import menupic from "../assets/menupic.png";
import cake from "../assets/cake.jpg";
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../config/firebase';
import {useParams} from "react-router-dom"
import MenuCard from '../components/MenuCard';

const Menu = () => {
  const { id } = useParams();
  // const MenuRef = doc(firestore, "Menu", id) // cai cho nay, thuc hien vao nha hang, lay uid do thay vao cai chuoi dai trong cmt kia
  const [menuData, setMenuData] = useState()
  const fetchMenu = async(uid) => {
    try{
      const MenuRef = doc(firestore, "Menu", uid) // cai cho nay, thuc hien vao nha hang, lay uid do thay vao cai chuoi dai trong cmt kia
      const docSnap = await getDoc(MenuRef);
      console.log(docSnap.data());
      setMenuData(docSnap.data())
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu(id);
  },[id])

  return (
    <>
      <Header />
      <div className='ml-4 mt-20 mb-8'>
        <div className='grid grid-cols-3 md:grid-cols-3 w-full h-fit gap-4'>
          <div className="flex flex-col justify-center items-center mb-8 sticky">
            {menuData && menuData.map((data, index) => {
              return (
                <MenuCard />
              )
            })}
            <div className='sticky'>
              <img
                  src={menupic}
                  alt="menupic"
                  className="h-full object-contain pl-5"
                />
              <p className='text-xl font-bold text-center pl-24'>Shop name</p>

            </div>
              

          </div>
        </div>

      </div>
      <Footer />

    </>
  )
}

export default Menu