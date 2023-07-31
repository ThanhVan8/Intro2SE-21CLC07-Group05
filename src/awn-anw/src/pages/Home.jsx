import React from 'react'
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import MainContainer from '../components/MainContainer';
import CreateContainer from "../components/CreateContainer";
import mainpic from "../assets/mainpic.png";


const Home = () => {
  return (

    <div>
        <Header />
        <div className='mt-16'>
          <p className='pl-5 py-5 mp'>Food for you</p>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full h-screen gap-4">
            {/* <div className="bg-blue-500 flex flex-col justify-center px-5 w-120px "> </div> */}
            {/* <div className="bg-blue-500 flex flex-col justify-center px-5 w-120px"> </div> */}
            <div className="bg-blue-500 grid grid-rows-2 grid-flow-col gap-4 justify-center px-5 ">
              <div className='bg-red-500'></div>
              <div className='bg-red-500'></div>
            </div>
            <div className="bg-blue-500 grid grid-rows-2 gap-4 justify-center px-5 "> 
            </div>


            <div className="bg-blue-500 hidden md:flex justify-end items-center mb-24">
              <img
                src={mainpic}
                alt="mainpic"
                className="h-2/3 object-contain fixed"
              />
            </div>
          </div>
        
        </div>
        
        <Footer />
    </div>
  )
}

export default Home;