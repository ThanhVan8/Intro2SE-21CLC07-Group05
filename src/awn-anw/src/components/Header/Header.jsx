import React, { useState } from "react";
import { Link } from "react-router-dom"

import logo from "../../assets/logo.png";

import { FaShoppingBag, FaReceipt, FaUserCircle, FaSearch } from "react-icons/fa";
import Modal from "../Modal";
import OrderStatus from "../../pages/OrderStatus";
import { useStateValue } from '../../context/StateProvider'

const Header = () => {
  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(query) 
  }

  const [{cartShow}, dispatch] = useStateValue()
  const handleCart = () => {
    dispatch({
      type: 'SET_CART_SHOW',
      cartShow: !cartShow,
    })
  }

  return (
    <header className="fixed z-50 w-full bg-primary p-1 px-4">
      <div className="flex w-full h-full gap-3">
        {/*Logo*/}
        <Link to={"/"} className="flex items-center">
          <div className="w-10 h-10">
            <img src={logo} alt="logo"/>
          </div>
        </Link>

        {/* Search bar */}
        <form className="flex w-full px-10 py-1 divide-x-2 divide-solid font-mono" onSubmit={e => handleSearch(e)}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-l-full px-3"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit' className="bg-white p-2 items-center rounded-r-full">
            <FaSearch className="text-xl" />
          </button>
        </form>

        {/*icons*/}
        <div className="flex items-center ml-auto gap-5 px-2">
          {/*Cart*/}
          <button onClick={handleCart}>
            <div className="relative">
              <FaShoppingBag className="text-white text-2xl" />
              <div className="w-4 h-4 rounded-full bg-[#F00] absolute top-3 -right-1 flex items-center justify-center">
                <p className="text-white text-xs font-medium">3</p>
              </div>
            </div>
          </button>
          {cartShow && <Modal />}

          <Link to={"/OrderStatus"}>
            <FaReceipt className="text-white text-2xl items-center" />
          </Link>
          <FaUserCircle className="text-white text-2xl items-center" />
        </div>
      </div>
    </header>
  );
};

export default Header;