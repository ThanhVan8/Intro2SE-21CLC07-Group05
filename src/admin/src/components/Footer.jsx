import React from 'react';
import logo from '../../src/assets/logo.png';
import {Link} from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
    <>
        <footer className='w-full bg-primary py-3 pr-8 bottom-0 px-4'>
            <div className='hidden md:flex w-full'>
                <Link to = {"/"} className = 'flex items-center'>
                    <img src={logo} className = 'w-14 object-cover' alt="Logo" />
                </Link>

                {/* about us */}
                <ul className='flex items-center mr-auto pl-4'>
                    <li className='text-xl text-textHeadingColor hover:text-textHover cursor-pointer'>About us</li>
                </ul>

                {/* social media */}
                <Link to ={"/"} className= "relative flex justify-center gap-4 items-end" >
                    <FaInstagram className=' text-2xl text-textHeadingColor hover:text-textHover cursor-pointer'/>
                    <FaFacebook className=' text-2xl text-textHeadingColor  hover:text-textHover cursor-pointer'/>
                </Link>

            </div>
        
        </footer>
    </>
    
  )
}

export default Footer