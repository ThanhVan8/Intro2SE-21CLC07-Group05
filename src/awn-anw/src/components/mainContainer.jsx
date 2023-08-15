import React, { useState, useEffect, useMemo } from 'react';
import {Link} from "react-router-dom";
import mainpic from "../assets/mainpic.png";
import salad from "../assets/salad.jpg"
import food from "../assets/food.png"
import { firestore } from "../config/firebase"
import { collection, getDocs } from 'firebase/firestore'
import Modal from './Modal';


const MainContainer = () => {
  const [categoryList, setCategoryList] = useState([])
  const CategoryCollectionRef = collection(firestore, "Category")

  useEffect(() => {
    const getCategoryList = async () => {
      try{
        const data = await getDocs(CategoryCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setCategoryList(filteredData)
        // console.log(filteredData);
      } catch (err){
        console.error(err);
      }
    };
    getCategoryList();
    // console.log(getCategoryList)
  }, [])

  return (
    <>
      <div className='ml-4 mt-16'>
          {/* Text */}
          <p className='pl-10 py-5 font-semibold text-2xl'>Food for you</p>       
          {/* devided into 3 cols */}
          <div className="grid grid-cols-2 md:grid-cols-3 w-full h-fit gap-4">
            <div className="grid col-span-2 grid-cols-2 gap-4 justify-item-start px-5 "> 
              <Link to = {"/"} className='w-full h-fit p-5'>
                <img  src={salad} 
                      alt="salad"
                      className='w-80 h-60 object-cover' 
                />
                <p className='text-textColor text-base py-2 '>Salad</p>
              </Link>             
              <Link to = {"/"} className='w-full h-fit p-5'>
                <img  src={salad} 
                      alt="salad"
                      className='w-80 h-60 object-cover' 
                />
                <p className='text-textColor text-base py-2 '>Salad</p>
              </Link>
              <Link to = {"/"} className=' w-full h-fit p-5'>
                <img  src={salad} 
                      alt="salad"
                      className='w-80 h-60 object-cover' 
                />
                <p className='text-textColor text-base py-2 '>Salad</p>
              </Link>
              <Link to = {"/"} className='w-full h-fit p-5'>
                <img  src={salad} 
                      alt="salad"
                      className='w-80 h-60 object-cover' 
                />
                <p className='text-textColor text-base py-2 '>Salad</p>
              </Link>

            </div>
            {/* last col - img */}
            <div className="hidden md:flex justify-end items-center">
              <img
                src={mainpic}
                alt="mainpic"
                className="h-full object-contain sticky pl-5"
              />
            </div>
          </div>
        </div>
    </>
  )
}

export default MainContainer;