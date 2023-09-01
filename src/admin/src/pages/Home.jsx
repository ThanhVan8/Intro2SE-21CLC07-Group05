import React, { useState, useEffect } from 'react';
import mainpic from "../assets/mainpic.png";
import Header from "../components/Header/Header"
import Footer from "../components/Footer"
import { FaRegMap } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { firestore } from '../config/firebase'
import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import useAuth from '../custom_hooks/useAuth'

const Home = () => {
  return (
    <>
        <div className='h-full w-full'>
          <Header />
            <div className="grid grid-cols-3 w-full py-8 mt-16">
                <div className='grid col-span-2 text-textColor text-left h-2/3 py-28 px-12 mx-10 gap-y-2 '>
                    <p className='h-fit text-3xl font-serif font-semibold text-center py-40 '>
                        Awn Anw Admin
                    </p> 
                </div>

                <div className="hidden md:flex justify-end items-center">
                  <img
                    src={mainpic}
                    alt="mainpic"
                    className="h-4/5 object-contain sticky"
                  />
                </div>
            </div>
          <Footer />  
        </div>
    </>
  );
};

export default Home