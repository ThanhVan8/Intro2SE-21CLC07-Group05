import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import InfoField from "../components/InfoField";
import useAuth from "../custom_hooks/useAuth";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import food from "../assets/food.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InfoAcc = () => {
  // const [merchantInfo, setMerchantInfo] = useState({Name: 'Lang Vong', Address: '123 abc', Phone: '12345', email: 'abc@mail.com'})
  const [merchantInfo, setMerchantInfo] = useState({});
  const [flagChange, setFlagChange] = useState(false);

  const merchant = useAuth();
  // var initialInfo = {Name: 'Lang Vong', Address: '123 abc', Phone: '12345', email: 'abc@mail.com'}
  var initialInfo = {};
  const fetchMerchantInfo = async (uid) => {
    try {
      const MerchantRef = doc(firestore, "Merchant", uid);
      const docSnap = await getDoc(MerchantRef);
      const merchantData = docSnap.data();
      setMerchantInfo(merchantData);
      var initialInfo = merchantData;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (merchant) {
      fetchMerchantInfo(merchant.uid);
    }
  }, [merchant]);

  const uploadImage = (e) => {};
  const deleteImage = () => {};
  const saveInfo = () => {
    // write here

    toast.success("Save successfully! Need to refresh page.", {
      autoClose: 3000,
    });
  };

  useEffect(() => {
    if (JSON.stringify(merchantInfo) !== JSON.stringify(initialInfo)) {
      setFlagChange(true);
    } else {
      setFlagChange(false);
    }
  }, [merchantInfo]);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen mt-28 px-10 font-mono text-base">
        <p className="font-serif text-3xl text-center font-semibold pb-5">
          MY ACCOUNT
        </p>
        <div className="grid grid-cols-2">
          {/* Info */}
          <div className="grid gap-8 pr-5">
            <InfoField
              title="STORE NAME"
              info={merchantInfo.Name}
              onChange={(e) => {
                setMerchantInfo({ ...merchantInfo, Name: e.target.value });
              }}
            />
            <InfoField
              title="ADDRESS"
              info={merchantInfo.Address}
              onChange={(e) =>
                setMerchantInfo({ ...merchantInfo, Address: e.target.value })
              }
            />
            <InfoField
              title="PHONE"
              info={merchantInfo.Phone}
              onChange={(e) =>
                setMerchantInfo({ ...merchantInfo, Phone: e.target.value })
              }
            />
            <InfoField
              title="EMAIL"
              info={merchantInfo.email}
              readOnly="readOnly"
            />
          </div>
          {/* Upload Image */}
          <div className="flex flex-col pl-5 items-end justify-center">
            <div className="border rounded-lg w-fit h-fit p-2">
              {!merchantInfo.Image ? (
                <label>
                  <div className="flex flex-col bg-inactive items-center justify-center cursor-pointer w-200 h-200">
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
                  <img
                    src={merchantInfo.Image}
                    alt="upload"
                    className="object-cover w-200 h-200"
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
        </div>

        {/* Button */}
        <div className="pt-10 flex justify-center">
          <button
            className={
              flagChange
                ? "w-fit md:w-200 bg-primary text-white font-medium p-2 rounded-lg"
                : "w-fit md:w-200 bg-disabled text-inactive2 font-medium p-2 rounded-lg"
            }
            onClick={saveInfo}
            disabled={!flagChange}
          >
            Save
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InfoAcc;