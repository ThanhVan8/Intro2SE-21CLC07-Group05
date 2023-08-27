import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Menu from './pages/Menu'
import OrderDetail from './pages/OrderDetail'
import OrderStatus from './pages/OrderStatus';
import ProtectedRoute from './routers/ProtectedRoute'
// import Menu from './pages/Menu'

const App = () => {
  return (
    <div className="w-full h-auto flex flex-col">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />   
        <Route path='/Cart' element = {<ProtectedRoute><Cart /></ProtectedRoute>}/>     
        <Route path='/OrderDetail' element = {<ProtectedRoute><OrderDetail /></ProtectedRoute>}/>     
        <Route path='/OrderStatus' element = {<ProtectedRoute><OrderStatus /></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App