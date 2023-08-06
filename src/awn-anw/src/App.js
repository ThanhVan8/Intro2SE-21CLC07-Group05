import React, { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './routers/ProtectedRoute'
import { firestore } from "./config/firebase"
import { collection, getDocs } from "firebase/firestore"

const App = () => {
  
  return (
    <div className="w-full h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />        
      </Routes>
    </div>
  )
}

export default App