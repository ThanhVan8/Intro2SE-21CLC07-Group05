import React from "react";

import logo from '../../assets/logo.png'
import {Link} from "react-router-dom"

const Header = () => {
    return(
    <header className='fixed z-50 bg-primary py-1 pr-8 pl-2 w-full top-0'>
        <div className='flex w-full'>
            <Link to = {"/"}>
                <img src={logo} className = 'w-12 object-cover items-center mx-2' alt="Logo" />
            </Link>
            
            <ul className='flex items-center w-full justify-between px-48'>
              <Link to = {"/Customer"}>
                <li className='text-lg font-serif font-extrabold text-textHeadingColor hover:text-textHover cursor-pointer'>Customers</li>
              </Link>
              <Link to = {"/Merchant"}>
                <li className='text-lg font-serif font-extrabold text-textHeadingColor hover:text-textHover cursor-pointer'>Merchants</li>
              </Link>
              <Link to = {"/Category"}>
                <li className='text-lg font-serif font-extrabold text-textHeadingColor hover:text-textHover cursor-pointer'>Categories</li>
              </Link>
            </ul>
        </div>
    </header>
    )
}

export default Header