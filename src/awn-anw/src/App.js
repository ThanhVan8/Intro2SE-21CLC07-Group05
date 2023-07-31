import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import HomeTest from './pages/HomeTest'
import ProtectedRoute from './routers/ProtectedRoute'
import mainContainer  from './components/mainContainer'
import createContainer from './components/createContainer'
import Home from './pages/Home'
const App = () => {
  return (
    <div className="w-screen h-auto flex flex-col">
      <Routes>
        {/* Signin - signup */}
        {/* <Route path="/" element={<ProtectedRoute><HomeTest /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        
        <Route path="/*" element={<mainContainer/>} />
        <Route path="/createContainer" element={<createContainer/>} /> */}
        

      </Routes>
      <Home/>
      {/* <Footer /> */}
    </div>
  )
}

export default App