import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Order from './pages/Order'
import Category from './pages/Category'
import Menu from './pages/Menu'
import InfoAcc from './pages/InfoAcc'
import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {

  return (
    <div className="w-full h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/Menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/Order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path="/InfoAcc" element={<ProtectedRoute><InfoAcc /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App;