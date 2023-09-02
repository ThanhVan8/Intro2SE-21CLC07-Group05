import React from 'react';
import logo from "../../src/assets/logo.png";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    // chỉnh cho chữ của heading nằm bên trái --> nhìn ổn hơn
  <header className='fixed z-50 w-full bg-primary py-1 pr-8 pl-2 font-serif font-semibold'>
    <div className='flex w-full h-fit gap-8'>
        <Link to = {"/"}>
            <img src={logo} className = 'w-12 object-cover mr-8' alt="Logo" />
        </Link>
        <ul className='flex items-center justify-between ml-40 px-48 gap-12'>
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
    </div>
    
  </header>
  ) 
}

export default Header