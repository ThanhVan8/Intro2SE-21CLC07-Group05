import React from "react";
import cake from "../assets/cake.jpg";
import { useStateValue } from '../context/StateProvider'
import AddModal from "./AddModal";

const MenuCard = ({index, foodName, foodDescription, foodPrice, idMerchant}) => {
  const [{ addFoodShow }, dispatch] = useStateValue()
  const showAddModal = () => {
    dispatch({
      type: 'SET_ADD_FOOD_SHOW',
      addFoodShow: !addFoodShow,
    })
  }
  return (
    <div className=" w-656 border border-black h-150 rounded-2xl">
      <div className="grid grid-cols-4 w-full h-full gap-2">
        <div>
          <img
            src={cake}
            alt="Food"
            className="h-32 w-32 object-cover rounded-full my-2 mx-4 "
          />
        </div>
        <div className="grid col-span-2 grid-cols-1 gap-2 justify-items-start my-4 h-fit py-4">
          <div className="text-xl font-semibold text-textColor ">
          {foodName}
          </div>
          <div className="text-base text-textColor opacity-50">{foodDescription}</div>
        </div>
        <div className="relative">
          <button
            className="rounded-3xl border bg-primary border-primary w-16 h-8 my-2 text-textHeadingColor text-base
                              absolute bottom-2 right-4 hover:opacity-80"
            onClick={showAddModal}>
            ADD
          </button>
        </div>
        {addFoodShow && 
        <AddModal index={index}
        foodName={foodName} 
        foodDescription={foodDescription}
        foodPrice={foodPrice}
        idMerchant={idMerchant}/>}
      </div>
    </div>
  );
};

export default MenuCard;
