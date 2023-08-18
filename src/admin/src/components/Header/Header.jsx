import React from "react";

import logo from '../../assets/logo.png'
import {Link} from "react-router-dom"

const Header = () => {
    return(
    <header className='fixed z-50 bg-primary py-1 pr-8 pl-2 w-full mb-16 top-0'>
        <div className='flex w-full gap-8'>
            <Link to = {"/"}>
                <img src={logo} className = 'w-12 object-cover mr-8' alt="Logo" />
            </Link>
            <ul className='flex items-center w-2/3 justify-between ml-40 px-48'>
              <Link to = {"/Customer"}>
                <li className='text-base text-textHeadingColor hover:text-textHover cursor-pointer'>Customers</li>
              </Link>
              <Link to = {"/Merchant"}>
                <li className='text-base text-textHeadingColor hover:text-textHover cursor-pointer'>Merchants</li>
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