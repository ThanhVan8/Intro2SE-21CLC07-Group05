import React from 'react';
import logo from "../../src/assets/logo.png";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    // chỉnh cho chữ của heading nằm bên trái --> nhìn ổn hơn
    <header className='fixed z-50 w-screen bg-primary py-1 pr-8 pl-2'>
        <div className='hidden md:flex w-full h-full'>
            <Link to = {"/"} className = 'flex items-center gap-2'>
                <img src={logo} className = 'w-12 object-cover' alt="Logo" />
            </Link>

            <ul className='flex items-center gap-8 ml-auto'>
                <li className='text-base text-textHeadingColor hover:text-textHover cursor-pointer'>Menu</li>
                <li className='text-base text-textHeadingColor hover:text-textHover cursor-pointer'>Order</li>
            </ul>
        </div>
        
    </header>
  ) 
}

export default Header