import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header'
import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore'
import { firestore } from '../config/firebase'

const HomeTest = () => {
  const [categoryList, setCategoryList] = useState([])
  const [merchantList, setMerchantList] = useState([])
  const [userList, setUserList] = useState([])


  const CategoryRef = collection(firestore, "Category")
  const MerchantRef = collection(firestore, "Merchant")
  const UserRef = collection(firestore, "User")


  const getCategory = async() => {
    try{
      const data = await getDocs(CategoryRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }))
      console.log(filteredData)
      setCategoryList(filteredData)
    }catch (err){
      console.error(err);
    }
  };

  useEffect(() => {
    getCategory();
}, [])

  const getMerchant = async() => {
    try{
      const data = await getDocs(MerchantRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }))
      console.log(filteredData)
      setMerchantList(filteredData)
    }catch (err){
      console.error(err);
    }
  };

  useEffect(() => {
    getMerchant();
}, [])

const getUser = async() => {
  try{
    const data = await getDocs(UserRef)
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
    }))
    console.log(filteredData)
    setUserList(filteredData)
  }catch (err){
    console.error(err);
  }
};

useEffect(() => {
  getUser();
}, [])

  return (
    <>
      <Header />
      <div>HOME</div>
    </>
  )
}

export default HomeTest