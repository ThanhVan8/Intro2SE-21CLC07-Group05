import React, { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import HomeTest from './pages/HomeTest'
import ProtectedRoute from './routers/ProtectedRoute'
import { firestore } from './config/firebase'
import { collection, getDocs } from 'firebase/firestore'

const App = () => {
  const [categoryList, setCategoryList] = useState([])
  const CategoryCollectionRef = collection( firestore, "Category")

  useEffect(() => {
    const getCategoryList = async () => {
      try{
        const data = await getDocs(CategoryCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        // setCategoryList(filteredData)
        console.log(filteredData);
      } catch (err){
        console.error(err);
      }
    };

    getCategoryList();
  }, [])


  return (
    <div className="w-screen h-auto flex flex-col">
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomeTest /></ProtectedRoute>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
      {/* <div>
        {categoryList.map((category) => (
          <div>
            <h1>{category.Name}</h1>
          </div>
        ))
        }
      </div> */}
    </div>
  )
}

export default App