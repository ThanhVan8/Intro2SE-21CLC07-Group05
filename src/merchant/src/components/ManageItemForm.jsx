import React, { useEffect, useState } from 'react'
import {FaTimes, FaCloudUploadAlt, FaTrashAlt} from "react-icons/fa"
import InputField from './InputField'
import { useStateValue } from '../context/StateProvider'

import food from "../assets/food.png"

const ManageItemForm = ({action, itemName, itemPrice, itemDescription, itemImageURL}) => {
  const [name, setName] = useState(itemName)
  const [price, setPrice] = useState(itemPrice)
  const [description, setDescription] = useState(itemDescription)
  const [imageURL, setImageURL] = useState(itemImageURL)

  const uploadImage = (e) => {
    const imgFile = e.target.files[0]
    // console.log(imgFile)

  }

  const deleteImage = (e) => {
    console.log('delete image')
  }

  const saveFood = () => {
    const newItem = action.payload;
    console.log(newItem)
    console.log('save food')
  }

  const [{ showAddItem, showUpdateItem }, dispatch] = useStateValue()

	const handleCloseModal = () => {
    if (action === "add")
      dispatch({
        type: 'SET_SHOW_ADD_ITEM',
        showAddItem: !showAddItem,
      })
    else if (action === "update")
      dispatch({
        type: 'SET_SHOW_UPDATE_ITEM',
        showUpdateItem: !showUpdateItem,
      })
	}

  return (
    <div className="fixed bg-black bg-opacity-25 top-0 left-0 w-full h-screen flex justify-center items-center z-50">
      <div className="bg-white drop-shadow-md p-5 w-full md:w-650 flex flex-col gap-4 rounded-lg">
        {/* Titile */}
        <div className="flex justify-between w-full">
          <p className="font-semibold">{action==='add' ? <>Add new</>:<>Update</>} food/drink</p>
          <button onClick={handleCloseModal}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Field */}
        <form className="flex flex-col items-center" onSubmit={saveFood}>
          <InputField
            label="Name"
            type="text"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            // placeholder={itemName}
          />
          <InputField
            label="Price"
            type="text"
            required={true}
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
            // placeholder={itemPrice}
          />
          <InputField
            label="Description"
            type="text"
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // placeholder={itemDescription}
          />

          <div className="flex flex-col items-center justify-center border rounded-lg p-1 m-2">
            {!imageURL ? (
              <label>
                <div className="flex flex-col w-200 h-200 bg-inactive items-center justify-center cursor-pointer">
                  <FaCloudUploadAlt className="text-5xl" />
                  <p className="text-sm">Click to upload image</p>
                  <input
                    type="file"
                    name="upload-image"
                    accept="image/jpg, image/png, image/jpeg"
                    className="w-0 h-0"
                    required={true}
                    onChange={uploadImage}
                  />
                </div>
              </label>
            ) : (
              <div className="w-full h-full relative">
                <img src={food} alt="upload" className="object-cover" />
                <div className="bg-red flex absolute top-2 right-2 p-1 rounded-full">
                  <button onClick={deleteImage}>
                    <FaTrashAlt className="text-lg text-white" />
                  </button>
                </div>
              </div>
            )}  
          </div>

          {/* Button */}
          <button
            className="w-fit md:w-[100px] bg-primary text-white font-medium p-2 rounded-lg self-center"
            // onClick={saveFood}
            type='submit'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageItemForm