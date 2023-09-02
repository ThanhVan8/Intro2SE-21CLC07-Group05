import React, { useState, useEffect } from "react";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import useAuth from "../custom_hooks/useAuth";
import Category from "../pages/Category";


const Dropdown = ({isDisable, selectedValue}) => {
	// console.log(categories)
  const [selectedCategory, setSelectedCategory] = useState(selectedValue);
  const [category, setCategories] = useState([]);

  const merchant = useAuth();

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
    // add to database
  };


  const FetchCategory = async() => {
      try{
          const categoriesRef = collection(firestore, "Category")
          // const cateData = new Set();
          var cateData = [];
          const querySnapshot = await getDocs(categoriesRef)
          querySnapshot.forEach((doc) => {
              const cate = doc.data();
              cateData.push(cate.Name);
              // console.log(cate.Name);
          })
          console.log(cateData);
          setCategories(cateData);
      }catch(err){
          console.error(err);
      }
  }
  useEffect(() => {
      FetchCategory();
  }, []);




  const AddCategory = async (cate) => {
    try {
      const merchantRef = doc(firestore, "Merchant", merchant.uid);
      let ID = "";
      const q = query(
        collection(firestore, "Category"),
        where("Name", "==", cate)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        ID = doc.id;
      });
      await updateDoc(merchantRef, {
        Categories: arrayUnion(ID),
      });
    } catch (err) {
      console.error(err);
    }
  };

  
  useEffect(() => {
    if (merchant) {
      AddCategory("cate");
    }
  }, []);

  return (
    <select
      value={selectedCategory}
      disabled={isDisable}
      autoFocus={!isDisable}
      className={
        isDisable
          ? "w-64 p-2.5 text-gray-500 bg-gray-100 border rounded-md shadow-sm outline-none appearance-none"
          : "w-64 p-2.5 text-textColor bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-primary hover:border-primary"
      }
      onChange={handleSelect}
    >
      <option>Rice</option>
      <option>Milk tea</option>
      <option>Noodle</option>
      <option>Chicken</option>
    </select>
  );
};

export default Dropdown;