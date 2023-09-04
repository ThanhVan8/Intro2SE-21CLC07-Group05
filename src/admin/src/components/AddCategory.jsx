import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateValue } from "../context/StateProvider";
import { FaTimes, FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { firestore, storage } from "../config/firebase"
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { doc, updateDoc, arrayUnion, arrayRemove, getFirestore, getDoc, setDoc, collection, addDoc  } from "firebase/firestore";


const AddCategory = () => {
  const [{ showAddCategory }, dispatch] = useStateValue();
  const [isLoading, setisLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState('');

  const handleCloseModal = () => {
    dispatch({
      type: "SET_SHOW_ADD_CATEGORY",
      showAddCategory: !showAddCategory,
    });
  };

  const uploadImage = async (e) => {
    setisLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `CategoryImage/${Date.now()}_${imageFile.name}`);
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
  const deleteImage = async() => {
    setisLoading(true);
    const deleteRef = ref(storage, imageURL);
    deleteObject(deleteRef).then(() => {
      setImageURL(null)
      setProgress(null)
      setTimeout(() => {
      }, 3000);
    });
  }

  const saveCategory = async() => {
    // const categoryRef = collection(firestore, "Merchant")	
    await addDoc(collection(firestore, "Category"), {
      Name: name,
      Image: imageURL
    })
	};

  return (
    <div className="fixed bg-black bg-opacity-25 top-0 left-0 w-full h-screen flex justify-center items-center z-50">
      <div className="bg-white drop-shadow-md p-5 w-full md:w-[650px] flex flex-col gap-4 rounded-lg">
        {/* Titile */}
        <div className="flex justify-between w-full">
          <p className="font-semibold text-xl">Add new category</p>
          <button onClick={handleCloseModal}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Field */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col py-2 w-full font-mono">
            <label htmlFor="input-field">Name</label>
            <input
              className="border border-[#D9D9D9] p-2 rounded-[10px]"
              type="text"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center justify-center border rounded-lg p-1 m-2">
            {!imageURL ? (
              <label>
                <div className="flex flex-col w-[200px] h-[200px] bg-inactive items-center justify-center cursor-pointer">
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
                <img
                  src={imageURL}
                  alt="upload"
                  className="object-cover w-[200px] h-[200px]"
                />
                <div className="bg-red flex absolute top-2 right-2 p-1 rounded-full">
                  <button onClick={deleteImage}>
                    <FaTrashAlt className="text-lg text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Button */}
        <button
          className="w-fit md:w-[100px] bg-primary text-white font-medium p-2 rounded-lg self-center"
          onClick={saveCategory}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddCategory;