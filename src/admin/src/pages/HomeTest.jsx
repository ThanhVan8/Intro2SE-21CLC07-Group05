// import React, { useState, useEffect } from 'react';
// import Header from '../components/Header/Header'
// import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore'

// const HomeTest = () => {
//   const 

//   useEffect(() => {
//     const getCategoryList = async () => {
//       try{
//         const data = await getDocs(CategoryCollectionRef)
//         const filteredData = data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id
//         }));
//         setCategoryList(filteredData)
//         console.log(filteredData);
//       } catch (err){
//         console.error(err);
//       }
//     };
//     getCategoryList();
//     // console.log(getCategoryList)
//   }, [])
//   return (
//     <>
//       <Header />
//       <div>HOME</div>
//     </>
//   )
// }

// export default HomeTest