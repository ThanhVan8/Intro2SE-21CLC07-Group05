import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import HomeTest from './pages/HomeTest'
import Home from './pages/Home'
import Merchant from './pages/Merchant'
import Customer from './pages/Customer'

import ProtectedRoute from './routers/ProtectedRoute'
import Category from './pages/Category'

const App = () => {
  return (
    <div className="w-full h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/Merchant" element={<Merchant />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/Category" element={<Category />} />
      </Routes>
    </div>
  )
}

export default App