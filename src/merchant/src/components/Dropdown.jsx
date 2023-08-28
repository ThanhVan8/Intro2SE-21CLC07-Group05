import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove  } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import useAuth from "../custom_hooks/useAuth";
import { getAuth } from "firebase/auth";


const Dropdown = ({isDisable, selectedValue}) => {
    const [selectedCategory, setSelectedCategory] = useState(selectedValue)
    const [categories, setCategories] = useState([])
    
	const merchant = useAuth();
    
    const handleSelect = (e) => {
        setSelectedCategory(e.target.value)
        // add to database
    }

    const AddCategory = async(cate) => {
            try{
                const merchantRef = doc(firestore, "Merchant", merchant.uid)
                let ID = ''
                const q = query(collection(firestore, "Category"),where ('Name',"==", cate));
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    ID = doc.id;
                });
                await updateDoc(merchantRef, {
                    Categories: arrayUnion(ID),
                });                
            }catch(err){
                console.error(err);
            }
        } 

    useEffect(() => {
        if(merchant){
            AddCategory("DimSum");
        }
    });

    const FetchCategory = async() => {
        try{
            const CategoryCollectionRef = collection(firestore, "Category")
            const data = await getDocs(CategoryCollectionRef)
            const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
            }));
            setCategories(filteredData)
            console.log(filteredData);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        FetchCategory();
    });

    return (
        <select value={selectedCategory} disabled={isDisable} autoFocus={!isDisable}
        className={isDisable?"w-64 p-2.5 text-gray-500 bg-gray-100 border rounded-md shadow-sm outline-none appearance-none"
        :"w-64 p-2.5 text-textColor bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-primary hover:border-primary"}   
        onChange={handleSelect}>
            <option>Rice</option>
            <option>Milk tea</option>
            <option>Noodle</option>
            <option>Chicken</option>
        </select>
    );
}

export default Dropdown