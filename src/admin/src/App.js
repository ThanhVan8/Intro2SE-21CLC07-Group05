import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import HomeTest from './pages/HomeTest'
import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {
  return (
    <div className="w-screen h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomeTest /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App