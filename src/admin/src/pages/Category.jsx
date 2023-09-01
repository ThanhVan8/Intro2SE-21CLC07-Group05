import React, { useState, useEffect } from "react";
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { FaTrashAlt } from "react-icons/fa";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
  } from "firebase/firestore";
import { firestore } from "../config/firebase";


const Category = () => {

    const [categoryList, setCategoryList] = useState([])

    const fetchCategory = async() => {
        try{
            const categoryRef = collection(firestore, "Category")
            const docSnap = await getDocs(categoryRef);
            let categorylist = []
            docSnap.forEach((doc) => {
                const category = doc.data() 
                categorylist.push(category)
            })
            setCategoryList(categorylist)
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCategory();
  }, []);




  return (
    <>
        <Header/>
           {/*Add category btn */}
            <div className='w-full mt-24 px-16 grid place-content-end'>
                <button className='bg-primary text-textHeadingColor h-8 px-4 rounded-lg font-sans text-base hover:bg-opacity-80'>
                    Add Category
                </button>
            </div> 

            {/* Category list */}
            <div className='flex flex-col w-full min-h-screen gap-2 py-16 px-16'>
                {categoryList && categoryList.map((category, index) => {
                    return (
                        <div className='w-full h-fit bg-gray grid grid-cols-2 justify-items-start py-2 px-4 gap-4'>
                        <div className='text-base capitalize font-mono py-2'>{categoryList[index].Name}</div>
                        <div className='text-base flex items-center justify-end'>
                        <button className='center-vertically bg-red h-8 w-8 rounded-full grid place-content-center hover:bg-opacity-80'>
                            <FaTrashAlt className='text-textHeadingColor'/>
                        </button>
                    </div>
                </div> 
                )
            })}                    
            </div>
            
        <Footer/>
    </>
  )
}

export default Category