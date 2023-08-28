import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Category from './pages/Category'
import Menu from './pages/Menu'
import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {
  return (
    <div className="w-full h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
    </div>
  )
}

export default App;