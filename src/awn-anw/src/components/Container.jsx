import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import mainpic from "../assets/mainpic.png";
import logo from "../assets/logo.png"
import { firestore } from "../config/firebase"
import { collection, getDocs  } from 'firebase/firestore'

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
      } catch (err){
        console.error(err);
      }
    };
    getCategoryList();
  }, [CategoryCollectionRef])

  return (
      <div className='ml-4 my-16 pl-5'>
          {/* Text */}
          <p className='py-5 font-bold font-serif text-3xl capitalize'>Food for you</p>       
          {/* divide into 3 cols */}
          <div className="grid grid-cols-2 md:grid-cols-3 w-full h-fit gap-2">
            <div className="grid col-span-2 grid-cols-2 justify-item-center gap-x-5 gap-y-9">
            {categoryList && categoryList.map((data) =>{
              return(
                <Link key={data.id} to = {`/ShopList/${data.id}`} className='w-full h-fit'>
                  <img  src={data.Image ? data.Image : logo} 
                        alt="salad"
                        className='w-full h-52 object-cover rounded-lg'
                  />
                  <p className='text-textColor text-2xl text-center pt-2'>{data.Name}</p>
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
  )
}

export default Container;