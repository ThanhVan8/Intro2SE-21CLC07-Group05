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
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import { FaCircleMinus } from "react-icons/fa6";
import useAuth from "../custom_hooks/useAuth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const [categories, setCategories] = useState([]); // Categories of merchant
  const merchant = useAuth();

  const handleRemove = async(index) => {
    try{
        const cateRef = doc(firestore, "Merchant", merchant.uid)
        const docSnap = await getDoc(cateRef)
        const merchantCate = docSnap.data()['Categories'];
        merchantCate.splice(index,1);
        updateDoc(cateRef, {
            Categories: merchantCate,
        })
				toast.success('Delete successfully! Need to refresh page.', {
					autoClose: 3000, // Thời gian tự đóng toast (milisecond)
				});
    }catch(err){
      console.error(err);
    }
  };

  const FetchMerchantCate = async (uid) => {
    try {
      const MerchantCateRef = doc(firestore, "Merchant", uid);
      const docSnap = await getDoc(MerchantCateRef);
      const merchantCate = docSnap.data()["Categories"];

      for (let i = 0; i < merchantCate.length; i++) {
        const CategoryRef = doc(firestore, "Category", merchantCate[i]);
        const docSnap = await getDoc(CategoryRef);
        const cate = docSnap.data().Name;
				setCategories(categories => [...categories, cate])
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (merchant) {
      FetchMerchantCate(merchant.uid);
    }
  }, [merchant]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center px-5 mt-28 w-full min-h-screen gap-10 font-mono text-base">
        <div className="flex flex-col items-center gap-3">
          <p className="font-semibold text-lg first-letter">
            Choose categories for your products to easily access to customers
          </p>
          <Dropdown />
        </div>

        <div className="grid gap-4">
          {categories.map((cat, index) => {
            return (
              <div key={index} className="flex gap-4">
								<div className="border w-64 rounded-md p-2.5 border-gray hover:border-inactive text-gray hover:text-inactive">
									{cat}
								</div>
								<button onClick={() => handleRemove(index)}>
                  <FaCircleMinus className="text-red text-xl" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;