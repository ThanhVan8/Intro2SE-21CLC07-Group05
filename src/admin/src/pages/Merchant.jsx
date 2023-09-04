import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";

const Merchant = () => {
  const [merchantList, setMerchantList] = useState([]);

  const fetchMerchant = async () => {
    try {
      const MerchantRef = collection(firestore, "Merchant");
      const docSnap = await getDocs(MerchantRef);
      docSnap.forEach((doc) => {
        setMerchantList((merchantList) => [...merchantList, doc.data()]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMerchant();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col w-full min-h-screen mt-16 gap-1 p-16 text-base">
			<p className="text-center font-serif font-semibold text-3xl pb-5">MERCHANTS</p>
			<div className="w-full h-fit bg-headingTable grid grid-cols-9 justify-items-start py-2 px-4 gap-4 font-semibold border-b">
				<p className="col-span-1"></p>
				<p className="col-span-4">Name</p>
				<p className="col-span-4">Email</p>
			</div>
				{merchantList &&
          merchantList.map((merchant, index) => {
            return (
              <div key={index} className={(index%2===0) ? 
							"w-full h-fit bg-white grid grid-cols-9 justify-items-start py-2 px-4 gap-4 hover:bg-yellow"
							:  "w-full h-fit bg-gray grid grid-cols-9 justify-items-start py-2 px-4 gap-4 hover:bg-yellow"
							}>
                <p className="col-span-1">{index+1}</p>
                <p className="col-span-4">{merchant.Name}</p>
                <p className="col-span-4">{merchant.email}</p>
              </div>
            );
          })}
      </div>
      <Footer />
    </>
  );
};

export default Merchant;