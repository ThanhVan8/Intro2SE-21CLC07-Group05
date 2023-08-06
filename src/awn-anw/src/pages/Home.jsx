import React from 'react'
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import mainpic from "../assets/mainpic.png";
import salad from "../assets/salad.jpg"
import food from "../assets/food.png"



const Home = () => {
  return (

    <div>
        <Header />

        {/* body */}
        <div className='ml-4 mt-16 mb-20'>

          {/* Text */}
          <p className='pl-10 py-5 font-semibold text-2xl'>Food for you</p>
          
          {/* devided into 3 cols */}
          <div className="grid grid-cols-3 md:grid-cols-3 w-full h-fit gap-4">

            {/* first col */}
            <div className="grid grid-rows-2 grid-flow-col gap-4 justify-item-start px-5 ">
              
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
            </div>

            {/* second col */}

            <div className="grid grid-rows-2 grid-flow-col gap-4 justify-item-start px-5 ">

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
        
        <Footer />

    </div>
  )
}

export default Home;