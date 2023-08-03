import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import HomeTest from './pages/HomeTest'
import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {
  return (
    <div className="w-screen h-auto flex flex-col">
      <Routes>

        <Route path="/" element={<ProtectedRoute><HomeTest /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} /> 

        <Route path="/Home" element={<Home />} /> 
      </Routes>
    </div>
  )
}

export default App;