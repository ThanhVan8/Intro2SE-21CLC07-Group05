import React, { useEffect, useState } from 'react'
import {FaTimes, FaCloudUploadAlt, FaTrashAlt} from "react-icons/fa"
import { useStateValue } from '../context/StateProvider'

const DeleteMess = ({idItem}) => {
  const [{ showDeleteItem }, dispatch] = useStateValue()
  const handleCloseModal = () => {
    dispatch({
      type: 'SET_SHOW_DELETE_ITEM',
      showDeleteItem: !showDeleteItem,
    })
	}
  const handleDelete = () => {
    // delete from database
    const merchant = useAuth();
    const docRef =  doc(firestore, "Menu", merchant.uid);
    const docSnap =  getDoc(docRef)
    //get array
    const des_list = docSnap.data()['Description'];
    const food_list = docSnap.data()['FoodList'];
    const price_list = docSnap.data()['Price']
    
    des_list.splice(idItem, 1)
    food_list.splice(idItem, 1)
    price_list.splice(idItem, 1)

    updateDoc(docRef, {
        ['Description']: des_list,
        ['FoodList']: food_list,
        ['Price']: price_list
    })
  }
  return (
    <div className="fixed bg-black bg-opacity-25 top-0 left-0 w-full h-screen flex justify-center items-center z-50">
      <form className="bg-white drop-shadow-md p-5 w-full md:w-460 flex flex-col gap-1 rounded-lg" onSubmit={handleDelete}>
        {/* Cancel icon */}
        <div className="flex justify-end w-full">
          <button onClick={handleCloseModal}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Titile */}
        <div className='flex gap-4 items-center'>
          <div className="bg-red p-1 w-fit h-fit">
            <FaTrashAlt className="text-lg text-white" />
          </div>
          <p>Delete this food/drink?</p>
        </div>

        {/* Button */}
        <div className='flex gap-3 self-end'>
          <button
            className="bg-gray font-medium text-black px-2 py-1 rounded-lg"
            onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className="bg-red font-medium text-white px-2 py-1 rounded-lg"
            type='submit'>
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteMess