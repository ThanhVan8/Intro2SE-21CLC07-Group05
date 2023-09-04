import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useStateValue } from '../context/StateProvider'
import AddModal from "./AddModal";

const MenuCard = ({index, foodName, foodDescription, foodPrice, foodImg, idMerchant}) => {
  const [currentFood, setCurrentFood] = useState({index, foodName, foodDescription, foodPrice, foodImg, idMerchant})
  const [{ addFoodShow, selectedFood }, dispatch] = useStateValue()
  const showAddModal = () => {
    dispatch({
      type: 'SET_ADD_FOOD_SHOW',
      addFoodShow: !addFoodShow,
    })
    dispatch({
      type: 'SET_SELECTED_FOOD',
      selectedFood: currentFood,
    })
  }
  return (
    <div className="w-full border border-black h-fit rounded-2xl my-2">
      <div className="flex w-full h-full">
        <div className="flex items-center m-2">
          <img
            src={foodImg ? foodImg : logo}
            alt="Food"
            className="h-28 w-28 object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2 h-fit py-4">
          <p className="text-xl font-semibold text-textColor capitalize ">
          {foodName}
          </p>
          <p className="text-textColor opacity-50">{foodDescription}</p>
          <p className="text-base text-textColor">{foodPrice} VND</p>
        </div>
        
      </div>
      <div className="relative">
          <button
            className="rounded-3xl border bg-primary border-primary w-16 h-8 my-2 text-textHeadingColor text-base
                              absolute bottom-1 right-4 hover:opacity-80 uppercase"
            onClick={showAddModal}>
            add
          </button>
        </div>
        {addFoodShow &&
          <AddModal addedFood={selectedFood} />
        }
    </div>
  );
};

export default MenuCard;