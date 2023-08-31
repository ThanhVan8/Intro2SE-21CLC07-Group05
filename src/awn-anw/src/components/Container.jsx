import React, { useState, useEffect, useMemo } from 'react';
import {Link} from "react-router-dom";
import mainpic from "../assets/mainpic.png";
import salad from "../assets/salad.jpg"
import food from "../assets/food.png"
import { firestore } from "../config/firebase"
import { collection, getDocs  } from 'firebase/firestore'
import Modal from './Modal';


const Container = () => {
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
    // console.log(categoryList)
  }, [])

  return (
    <>
      <div className='ml-4 mt-16 mb-4'>
          {/* Text */}
          <p className='pl-10 py-5 font-bold font-serif text-3xl capitalize'>Food for you</p>       
          {/* devided into 3 cols */}
          <div className="grid grid-cols-2 md:grid-cols-3 w-full h-fit gap-4">
            <div className="grid col-span-2 grid-cols-2 gap-8 justify-item-start px-5">
            {categoryList && categoryList.map((data) =>{
              return(
                <Link key={data.id} to = {`/ShopList/${data.id}`} className='w-full h-fit p-5'>
                  <img  src={salad} 
                        alt="salad"
                        className='w-72 h-52 object-cover' 
                  />
                  <p className='text-textColor my-4 font-mono text-2xl w-72 text-center'>{data.Name}</p>
                </Link>
                )
            })} 
            </div>
            {/* last col - img */}
            <div className="hidden md:flex justify-end items-center">
              <img
                src={mainpic}
                alt="mainpic"
                className="h-2/3 object-contain sticky pl-12"
              />
            </div>
          </div>
        </div>
    </>
  )
}

export default Container;