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
  const [buyerInfo, setBuyerInfo] = useState({});
  const [initialInfo, setInitialInfo] = useState({});
  const [flagChange, setFlagChange] = useState(false);

  const buyer = useAuth();
  const fetchBuyerInfo = async (uid) => {
    try {
      const BuyerRef = doc(firestore, "User", uid)
      const docSnap = await getDoc(BuyerRef)
      const buyerData = docSnap.data()
      setBuyerInfo(buyerData)
      setInitialInfo(buyerData)
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (buyer) {
      fetchBuyerInfo(buyer.uid);
    }
  }, [buyer]);

  const saveInfo = () => {
    // write here

    toast.success("Save successfully! Need to refresh page.", {
      autoClose: 3000,
    });
  };

  useEffect(() => {
    if (buyerInfo.Name !== initialInfo.Name || buyerInfo.Address !== initialInfo.Address || buyerInfo.Phone !== initialInfo.Phone) {
      setFlagChange(true);
    } else {
      setFlagChange(false);
    }
  }, [buyerInfo]);

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
              info={buyerInfo.Name}
              onChange={(e) => {
                setBuyerInfo({ ...buyerInfo, Name: e.target.value });
              }}
            />
            <InfoField
              title="ADDRESS"
              info={buyerInfo.Address}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, Address: e.target.value })
              }
            />
            <InfoField
              title="PHONE"
              info={buyerInfo.Phone}
              onChange={(e) =>
                setBuyerInfo({ ...buyerInfo, Phone: e.target.value })
              }
            />
            <InfoField
              title="EMAIL"
              info={buyerInfo.email}
              readOnly="readOnly"
            />
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