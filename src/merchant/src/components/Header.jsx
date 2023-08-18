import React from 'react';
import logo from "../../src/assets/logo.png";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    // chỉnh cho chữ của heading nằm bên trái --> nhìn ổn hơn
  <header className='fixed z-50 w-screen bg-primary py-1 pr-8 pl-2'>
    <div className='flex w-full h-fit gap-8'>
        <Link to = {"/"}>
            <img src={logo} className = 'w-12 object-cover mr-8' alt="Logo" />
        </Link>
        <ul className='flex items-center w-2/3 justify-between ml-40 px-48'>
          <Link to = {"/"}>
            <li className='text-base text-textHeadingColor hover:text-textHover cursor-pointer'>Menu</li>
          </Link>
          <Link to = {"/"}>
            <li className='text-base text-textHeadingColor hover:text-textHover cursor-pointer'>Order</li>
          </Link>
          <Link to = {"/Category"}>
            <li className='text-base text-textHeadingColor hover:text-textHover cursor-pointer'>Category</li>
          </Link>
        </ul>
    </div>
    
  </header>
  ) 
}

export default Header