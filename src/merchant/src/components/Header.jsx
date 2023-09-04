import React from 'react';
import logo from "../../src/assets/logo.png";
import {Link} from "react-router-dom"
import { FaStore } from "react-icons/fa";

const Header = () => {
  return (
  <>
  <header className='fixed z-50 w-full bg-primary py-1 px-4 font-serif font-semibold'>
    <div className='flex w-full h-fit items-center pr-2'>
        <Link to = {"/"}>
            <img src={logo} className = 'w-12 object-cover relative left-0' alt="Logo" />
        </Link>
        <ul className='w-full flex items-center justify-center px-48 gap-32'>
          <Link to = {"/Menu"}>
            <li className='text-lg text-textHeadingColor hover:text-textHover cursor-pointer'>Menu</li>
          </Link>
          <Link to = {"/Order"}>
            <li className='text-lg text-textHeadingColor hover:text-textHover cursor-pointer'>Orders</li>
          </Link>
          <Link to = {"/Category"}>
            <li className='text-lg text-textHeadingColor hover:text-textHover cursor-pointer'>Categories</li>
          </Link>
        </ul>
        <Link to = {"/InfoAcc"}>
          <div className='flex flex-none rounded-full w-8 h-8 items-center justify-center bg-white'>
            <FaStore className='text-2xl text-primary'/>
          </div>
        </Link>
    </div>
  </header>
  </>
  )
}

export default Header