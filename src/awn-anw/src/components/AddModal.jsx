import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { FaTimes, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import {
  addDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import useAuth from "../custom_hooks/useAuth";

const AddModal = ({ addedFood }) => {
  const [count, setCount] = useState(1);
  function handleAddClick() {
    setCount(count + 1);
  }
  function handleMinClick() {
    if (count > 1) setCount(count - 1);
  }

  const [{ addFoodShow, selectedFood, countCart }, dispatch] = useStateValue();
  const handleCloseModal = () => {
    dispatch({
      type: "SET_ADD_FOOD_SHOW",
      addFoodShow: !addFoodShow,
    });
  };

  const cart = useAuth();
  // const [foods, setFoods] = useState([])
  // const [quants, setQuants] = useState([])

  const addCart = async () => {
    try {
      const docRef = doc(firestore, "ShoppingCart", cart.uid);
      const docSnap = await getDoc(docRef);

      // setFoods([...foods, addedFood.index])
      // setQuants([...quants, quants])

      const m_id = docSnap.data().merchant_id;

      if (m_id == addedFood.idMerchant) {
        var food_list = docSnap.data().Food
        var quant_list = docSnap.data().Quantity

        for (let i = 0; i < food_list.length; i++) {
          if (food_list[i] == addedFood.index) {
            quant_list[i] = quant_list[i] + count;
            updateDoc(docRef, {
              Quantity: quant_list,
            });
            return;
          }
        }

        food_list.push(String(addedFood.index));
        quant_list.push(count);

        // setFoods(foods => [...foods, food_list])
        // setQuants(quants => [...quants, quants])

        updateDoc(docRef, {
          Food: food_list,
          Quantity: quant_list,
          merchant_id: addedFood.idMerchant,
        });

        dispatch({
          type: "SET_COUNT_CART",
          countCart: countCart + 1,
        });
      }
      if (m_id != addedFood.idMerchant) {
        var food_list = [];
        var quant_list = [];
        food_list.push(String(addedFood.index));
        quant_list.push(count);
        updateDoc(docRef, {
          Food: food_list,
          Quantity: quant_list,
          merchant_id: addedFood.idMerchant,
        });

        dispatch({
          type: "SET_COUNT_CART",
          countCart: 1,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 	const deleteCart = async (idx) => {
  //   	try {
  //     	//get array
  // 		const docSnap = await getDoc(docRef)
  // 		const food_list = docSnap.data()['Food'];
  // 		const quant_list = docSnap.data()['Quantity'];

  //     	//delete
  //     	food_list.splice(idx, 1)
  //     	quant_list.splice(idx, 1)
  //     	updateDoc(docRef, {
  //       	['Food']: food_list,
  //       	['Quantity']: quant_list
  //     	})
  //   	}catch(err){
  // 	console.error(err);
  // 	}
  // }

  return (
    <div className="fixed bg-opacity-10 bg-black top-0 left-0 w-full h-screen flex justify-center items-center z-50">
      <div className="bg-white p-5 w-full md:w-460 flex flex-col gap-3 rounded-lg">
        {/* Cancel icon */}
        <div className="flex justify-end w-full">
          <button onClick={handleCloseModal}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Card */}
        <div className=" w-full border border-black h-fit rounded-2xl p-2 px-4 flex gap-4 items-center">
          {/* Image */}
          <div className="flex-none flex item">
            <img src={addedFood.foodImg ? addedFood.foodImg : logo} alt="food" className="w-16 h-16 rounded-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col w-full relative gap-2">
            <p className="font-semibold text-base">{addedFood.foodName}</p>
            <p className="text-gray-500">
              {addedFood.foodDescription}
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-5">
          <div className="flex flex-row justify-start items-center gap-2 h-full">
            <button onClick={handleMinClick}>
              <FaMinusCircle className="h-5 w-5 text-primary hover:opacity-80" />
            </button>
            <div className="h-6 w-fit border border-black px-2">{count}</div>
            <button onClick={handleAddClick}>
              <FaPlusCircle className="h-5 w-5 text-primary hover:opacity-80" />
            </button>
          </div>

          <p className="font-medium text-base">
            {Number(addedFood.foodPrice) * count} VND
          </p>
        </div>

        <div className="grid place-items-end pt-3">
          <button
            className="rounded-3xl border bg-primary border-primary w-16 h-8
								text-textHeadingColor text-base hover:opacity-80"
            onClick={() => {
              addCart();
              handleCloseModal();
            }}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;