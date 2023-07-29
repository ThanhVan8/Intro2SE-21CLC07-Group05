import React from 'react'
<<<<<<< HEAD
import { Header } from './components'

const App = () => {
  return (
    <div classname = "w-screen h-auto flex flex-col" >
      <Header />
=======
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import HomeTest from './pages/HomeTest'
import ProtectedRoute from './routers/ProtectedRoute'

const App = () => {
  return (
    <div className="w-screen h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomeTest /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
>>>>>>> 005f1007bedabe93862f18266072dac037636983
    </div>
  )
}

export default App