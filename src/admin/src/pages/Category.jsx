import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { FaTrashAlt } from "react-icons/fa";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateValue } from "../context/StateProvider";
import AddCategory from "../components/AddCategory";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategory = async () => {
    try {
      const categoryRef = collection(firestore, "Category");
      const docSnap = await getDocs(categoryRef);
      docSnap.forEach((doc) => {
        setCategoryList((categoryList) => [...categoryList, doc.data()]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const deleteCategory = async () => {

    toast.success('Delete successfully! Need to refresh page.', {
      autoClose: 3000,
    });
  }

  const [{ showAddCategory }, dispatch] = useStateValue();
  const handleAddCategory = () => {
    dispatch({
      type: "SET_SHOW_ADD_CATEGORY",
      showAddCategory: !showAddCategory,
    });
  };

  return (
    <>
      <Header />
      {/*Add category btn */}
      <div className="w-full mt-16 p-16 flex flex-col min-h-screen">
        <p className="text-center font-serif font-semibold text-3xl pb-5">CATEGORIES</p>
        <button 
          className="bg-primary text-textHeadingColor h-8 px-4 rounded-lg text-base hover:bg-opacity-80 self-end"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      
      {/* Category list */}
      <div className="flex flex-col w-full gap-1 pt-10">
        {categoryList &&
          categoryList.map((category, index) => {
            return (
              <div key={index} className="w-full h-fit flex justify-between rounded-md items-center gap-4">
                <div className="flex gap-1 items-center h-20 w-full">
                  <img src={category.Imgae ? category.Imgae : logo} alt="logo" className="w-20 h-20 rounded-md object-cover" />
                  <div className="text-base font-mono bg-gray w-full h-full px-4 flex items-center rounded-md">
                    <p>{category.Name}</p>
                  </div>
                </div>
                <button 
                  className="center-vertically bg-red h-8 w-8 rounded-full grid place-content-center hover:bg-opacity-80 justify-self-end"
                  onClick={deleteCategory}
                >
                  <FaTrashAlt className="text-textHeadingColor text-base" />
                </button>
              </div>
            );
          })}
      </div>
      </div>
      {showAddCategory && <AddCategory />}
      <Footer />
    </>
  );
};

export default Category;