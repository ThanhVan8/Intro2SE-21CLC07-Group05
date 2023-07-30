import React from 'react';
import mainpic from "../assets/mainpic.png";
import Header from "../components/Header"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <>
        <Header />
        <div className="grid h-screen w-full pt-16">
            <div className="hidden md:flex justify-end items-center">
            <img src={mainpic}  alt="mainpic"   className="h-2/3 object-contain fixed"/>
            </div>    
        </div>
        
        <Footer />
    </>
  );
};

export default Home