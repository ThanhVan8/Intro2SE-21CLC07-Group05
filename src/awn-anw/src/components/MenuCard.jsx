import React, { useState } from "react";
import cake from "../assets/cake.jpg";
import { useStateValue } from '../context/StateProvider'
import AddModal from "./AddModal";

const MenuCard = ({index, foodName, foodDescription, foodPrice, idMerchant}) => {
  const [currentFood, setCurrentFood] = useState({index, foodName, foodDescription, foodPrice, idMerchant})
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
    <div className=" w-656 border border-black h-150 rounded-2xl">
      <div className="grid grid-cols-4 w-full h-full gap-2">
        <div>
          <img
            src={cake}
            alt="Food"
            className="h-28 w-28 object-cover rounded-full my-4 mx-4 "
          />
        </div>
        <div className="grid col-span-2 grid-cols-1 gap-2 justify-items-start my-4 h-fit py-4">
          <div className="text-xl font-semibold text-textColor font-mono capitalize ">
          {foodName}
          </div>
          <div className="text-base text-textColor opacity-50 font-mono">{foodDescription}</div>
        </div>
        <div className="relative">
          <button
            className="rounded-3xl border bg-primary border-primary w-16 h-8 my-2 text-textHeadingColor text-base
                              absolute bottom-2 right-4 hover:opacity-80 font-mono uppercase"
            onClick={showAddModal}>
            add
          </button>
        </div>
        {addFoodShow &&
          <AddModal addedFood={selectedFood} />
        }
      </div>
    </div>
  );
};

export default MenuCard;