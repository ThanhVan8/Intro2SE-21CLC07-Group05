import React from 'react'
import {Header, Footer, Infor } from './components'
import {Route, Routes } from 'react-router-dom'

const App = () => {
  return (

      <div className="w-screen h-auto flex flex-col">
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} /> */}
      </Routes>
      </div>

  )
}

export default App