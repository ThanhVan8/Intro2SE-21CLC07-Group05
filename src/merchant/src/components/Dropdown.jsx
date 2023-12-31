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
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dropdown = ({selectedValue}) => {
  const [selectedCategory, setSelectedCategory] = useState(selectedValue);
  const [category, setCategories] = useState([]);

  const merchant = useAuth();

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
		AddCategory(e.target.value)
  };

  const FetchCategory = async() => {
      try{
          const categoriesRef = collection(firestore, "Category")
          // var cateData = [];
          const querySnapshot = await getDocs(categoriesRef)
          querySnapshot.forEach((doc) => {
              // const cate = doc.data();
              // cateData.push(cate.Name);
              setCategories((prev) => [...prev, doc.data().Name])
          })
          // setCategories(cateData);
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
      setCategories((prev) => [...prev, cate])

			toast.success('Add successfully! Need to refresh page.', {
				autoClose: 3000, // Thời gian tự đóng toast (milisecond)
			});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <select
      value={selectedCategory}
      autoFocus={true}
      className={"w-64 p-2.5 text-textColor bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-primary hover:border-primary"}
      onChange={handleSelect}
    >
			{category.map(cate => {
				return (
					<option>{cate}</option>
				)
			})}
    </select>
  );
};

export default Dropdown;