import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import menupic from "../assets/menupic.png";
import cake from "../assets/cake.jpg";
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../config/firebase';




const Menu = () => {
  const MenuRef = doc(firestore, "Menu", "gJXzL7VOkgME8JXGrIN5q9WsdXd2")

  const fetchMenu = async() => {
    try{
      const docSnap = await getDoc(MenuRef);
      console.log(docSnap.data());
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  },[])

  return (
    <>
      <Header />
      <div className='ml-4 mt-20 mb-8'>
        <div className='grid grid-cols-3 md:grid-cols-3 w-full h-fit gap-4'>
          
          <div className='grid col-span-2 grid-cols-1 gap-4 justify-item-start p-12 min-h-420'>
            <div className=' w-656 border border-black h-150 rounded-2xl'>
              <div className='grid grid-cols-4 w-full h-full gap-2'>
                <div>
                  <img src={cake} alt="Food image" className='h-32 w-32 object-cover rounded-full my-2 mx-4 ' />
                </div>
                <div className='grid col-span-2 grid-cols-1 gap-2 justify-items-start my-4 h-fit py-4'>
                  <div className='text-xl font-semibold text-textColor '>Cheese Cake</div>
                  <div className='text-base text-textColor opacity-50'>Sweet</div>
                </div>
                <div className='relative'>
                  <button 
                    className='rounded-3xl border bg-primary border-primary w-16 h-8 my-2 text-textHeadingColor text-base
                              absolute bottom-2 right-4 hover:opacity-80'>
                    
                    ADD
                  </button>
                </div>
                
              </div>
            </div>

            <div className=' w-656 border border-black h-150 rounded-2xl'>
              <div className='grid grid-cols-4 w-full h-full gap-2'>
                <div>
                  <img src={cake} alt="Food image" className='h-32 w-32 object-cover rounded-full my-2 mx-4 ' />
                </div>
                <div className='grid col-span-2 grid-cols-1 gap-2 justify-items-start my-4 h-fit py-4'>
                  <div className='text-xl font-semibold text-textColor '>Cheese Cake</div>
                  <div className='text-base text-textColor opacity-50'>Sweet</div>
                </div>
                <div className='relative'>
                  <button 
                    className='rounded-3xl border bg-primary border-primary w-16 h-8 my-2 text-textHeadingColor text-base
                              absolute bottom-2 right-4 hover:opacity-80'>
                    
                    ADD
                  </button>
                </div>
                
              </div>
            </div>

            <div className=' w-656 border border-black h-150 rounded-2xl'>
              <div className='grid grid-cols-4 w-full h-full gap-2'>
                <div>
                  <img src={cake} alt="Food image" className='h-32 w-32 object-cover rounded-full my-2 mx-4 ' />
                </div>
                <div className='grid col-span-2 grid-cols-1 gap-2 justify-items-start my-4 h-fit py-4'>
                  <div className='text-xl font-semibold text-textColor '>Cheese Cake</div>
                  <div className='text-base text-textColor opacity-50'>Sweet</div>
                </div>
                <div className='relative'>
                  <button 
                    className='rounded-3xl border bg-primary border-primary w-16 h-8 my-2 text-textHeadingColor text-base
                              absolute bottom-2 right-4 hover:opacity-80'>
                    
                    ADD
                  </button>
                </div>
                
              </div>
            </div>
            
          </div>
          <div className="flex flex-col justify-center items-center mb-8 sticky">
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