import React from "react";

import logo from '../../assets/logo.png'

import { FaShoppingBag } from "react-icons/fa";

const Header = () => {
    return(
        <header className="fixed z-50 w-full bg-primary p-1 px-2 top-0">
            <div className="flex w-full h-full">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-10 h-10"/>
                </div>
                <div className="relative flex items-center justify-center ml-auto">
                    <FaShoppingBag className="text-white text-2xl cursor-pointer"/>
					<div className="w-4 h-4 rounded-full bg-[#F00] absolute bottom-1 -right-1 flex items-center justify-center">
						<p className="text-white text-xs font-medium">3</p>
					</div>
                </div>
            </div>
        </header>
    )
}

export default Header