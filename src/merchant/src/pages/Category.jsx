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

const Category = () => {
  const [categories, setCategories] = useState([]); // Categories of merchant

  const handleRemove = (index) => {
    console.log(index);
  };

  const merchant = useAuth();
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

  const DeleteCategory = async(index) => {
  	try{
  		const merchantRef = doc(firestore, "Merchant", merchant.uid)
  		let ID = ''
  		const q = query(collection(firestore, "Category"),where ('Name',"==", cate));
  		const querySnapshot = await getDocs(q)
  		querySnapshot.forEach((doc) => {
  			ID = doc.id;
  		});
  		await updateDoc(merchantRef, {
  			Categories: arrayRemove(ID),
  		});
  	}catch(err){
  		console.error(err);
  	}
  }

  // useEffect(() => {
  // 	if(merchant){
  // 		AddCategory("cate");
  // 	}
  // },[]);

  // Category cua ca he thong

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