import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {
  return (
    <div className="w-screen h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App;