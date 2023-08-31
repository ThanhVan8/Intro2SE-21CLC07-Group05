import React from 'react';
import logo from '../../src/assets/logo.png';
import {Link} from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <footer className='sticky w-full bg-primary py-3 pr-8 bottom-0 px-4 grid grid-cols-2'>
            <Link to = {"/"} className = 'flex items-center'>
                <img src={logo} className = 'w-14 object-cover' alt="Logo" />
            </Link>

            {/* social media */}
            <Link to ={"/"} className= " justify-self-end flex items-center gap-4" >
                <FaInstagram className=' text-2xl text-textHeadingColor hover:text-textHover cursor-pointer'/>
                <FaFacebook className=' text-2xl text-textHeadingColor  hover:text-textHover cursor-pointer'/>
            </Link>
        </footer>
    </>
    
  )
}

export default Footer