import React from 'react'
import {Link} from 'react-router-dom'

import logo from '../../assets/logo.png'
import {FaInstagram} from 'react-icons/fa'
import {FaFacebookSquare} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full z-50 bg-primary p-1 px-2 mt-6">
        <div className="flex w-full h-full">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="w-20 h-20"/>
            </div>
            <Link to={"/"} className="flex items-center ml-6">  {/*TODO: Change this link to About Us page*/}
                <p className="text-white hover:underline font-medium">About us</p>
            </Link>
            <div className="flex flex-row items-center ml-auto gap-5">
                <FaInstagram className='text-white text-2xl cursor-pointer'/>
                <FaFacebookSquare className='text-white text-2xl cursor-pointer'/>
            </div>
        </div>
    </footer>
  )
}

export default Footer