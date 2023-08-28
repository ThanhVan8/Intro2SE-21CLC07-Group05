import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Menu from './pages/Menu'
import OrderDetail from './pages/OrderDetail'
import OrderStatus from './pages/OrderStatus';
import ShopList from './pages/ShopList';
import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {
  return (
    <div className="w-full h-auto flex flex-col">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />   
        <Route path='/Menu' element = {<ProtectedRoute><Menu /></ProtectedRoute>}/>     
        <Route path='/OrderDetail' element = {<ProtectedRoute><OrderDetail /></ProtectedRoute>}/>     
        <Route path='/OrderStatus' element = {<ProtectedRoute><OrderStatus /></ProtectedRoute>}/>
        <Route path='/ShopList/:id' element = {<ProtectedRoute><ShopList /></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App