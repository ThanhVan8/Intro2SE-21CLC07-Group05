import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Menu from './pages/Menu'
import OrderDetail from './pages/OrderDetail'
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
        <Route path='/Home' element = {<Home />}/>     
        {/* <Route path='/Menu' element = {<Menu />}/>      */}

        {/* <Route path='/Cart' element = {<Cart />}/>     */}
        <Route path='/Menu' element = {<Menu />}/>     
        <Route path='/OrderDetail' element = {<OrderDetail />}/>     

      </Routes>
    </div>
  )
}

export default App