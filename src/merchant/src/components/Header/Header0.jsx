import React from "react";

import logo from '../../assets/logo.png'

const Header0 = () => {
    return(
        <header className="fixed z-50 w-full bg-primary p-1 px-2">
            <div className="flex w-full h-full">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-10 h-10"/>
                </div>
            </div>
        </header>
    )
};

export default Header0;