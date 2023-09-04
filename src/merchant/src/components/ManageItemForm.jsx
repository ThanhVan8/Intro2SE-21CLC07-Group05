import React, { useEffect, useState } from 'react'
import {FaTimes, FaCloudUploadAlt, FaTrashAlt} from "react-icons/fa"
import InputField from './InputField'
import { useStateValue } from '../context/StateProvider'
import { firestore, storage } from "../config/firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getFirestore, getDoc  } from "firebase/firestore";
import food from "../assets/food.png"
import useAuth from '../custom_hooks/useAuth'
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ManageItemForm = ({action, itemName, itemPrice, itemDescription, itemImageURL, idItem}) => {
  const [name, setName] = useState(itemName)
  const [price, setPrice] = useState(itemPrice)
  const [description, setDescription] = useState(itemDescription)
  const [isLoading, setisLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [imageURL, setImageURL] = useState(itemImageURL)
  // const dispatch = useDispatch();
  
  // const alert = useSelector((state) => state.alert)
  // const dispatch1 = useDispatch();

  const uploadImage = (e) => {
    setisLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `MenuImages/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', 
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, 
        (error) => {
          setTimeout(() => {
          }, 3000);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
            // console.log('File available at', downloadURL);
            setImageURL(imageURL)
            setisLoading(false)
            setProgress(null)
            setTimeout(() => {
           }, 3000);
        });
      }
    );
  } 

  const deleteImage = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageURL);
    deleteObject(deleteRef).then(() => {
      setImageURL(null)
      setProgress(null)
      setTimeout(() => {
      }, 3000);
    });
  }

  const saveFood = () => {
    // console.log(action)
    if (action === "add") {
      addFood()
    }
    else if (action === "update") {
      updateFood()
    }
    handleCloseModal()
    toast.success('Save successfully! Need to refresh page.', {
      autoClose: 3000, // Thời gian tự đóng toast (milisecond)
    });
  }

  // const deleteImage = (e) => {
  //   console.log('delete image')
  // }
  const merchant = useAuth();
  
  const addFood = () => {
      
    const docRef =  doc(firestore, "Menu", merchant.uid);
    
    // update array
    updateDoc(docRef, { 
      Description: arrayUnion(description),
      FoodList: arrayUnion(name),
      Price: arrayUnion(price),
      Image: arrayUnion(imageURL ? imageURL : null)
    })
  }

  const updateFood = async () => {
      
    const docRef =  doc(firestore, "Menu", merchant.uid);
    const docSnap = await getDoc(docRef)

    //delete old value in array
    const des_list = docSnap.data()['Description'];
    const food_list = docSnap.data()['FoodList'];
    const price_list = docSnap.data()['Price']
    const image_list = docSnap.data()['Image']

    des_list.splice(idItem, 1)
    food_list.splice(idItem, 1)
    price_list.splice(idItem, 1)
    image_list.splice(idItem, 1)

    //update new value into array
    des_list.splice(idItem,0, description)
    food_list.splice(idItem, 0, name)
    price_list.splice(idItem, 0, price)
    image_list.splice(idItem, 0, imageURL)
    // update array
    updateDoc(docRef, {
      ['Description']: des_list,
      ['FoodList']: food_list,
      ['Price']: price_list,
      ['Image']: image_list
    });
  }
  
  const [{ showAddItem, showUpdateItem }, dispatch ] = useStateValue()

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
          <p className="font-semibold text-xl">{action==='add' ? <>Add new</>:<>Update</>} food/drink</p>
          <button onClick={handleCloseModal}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Field */}
        <div className="flex flex-col items-center" >
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
                    required={false}
                    onChange={uploadImage}
                  />
                </div>
              </label>
            ) : (
              <div className="w-full h-full relative">
                <img src={imageURL} alt="upload" className="object-cover w-200 h-200" />
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
            onClick={saveFood}>
            {/* type='submit'> */}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageItemForm