import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
// import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {
  return (
    <div className="w-screen h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App