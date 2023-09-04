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

const Customer = () => {
  const [buyerList, setBuyerList] = useState([]);

  const fetchBuyer = async () => {
    try {
      const BuyerRef = collection(firestore, "User");
      const docSnap = await getDocs(BuyerRef);
      docSnap.forEach((doc) => {
				setBuyerList(buyerList => [...buyerList, doc.data()]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBuyer();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col w-full min-h-screen mt-16 gap-1 p-16 text-base">
			<p className="text-center font-serif font-semibold text-3xl pb-5">CUSTOMERS</p>
			<div className="w-full h-fit bg-headingTable grid grid-cols-9 justify-items-start py-2 px-4 gap-4 font-semibold border-b">
				<p className="col-span-1"></p>
				<p className="col-span-4">Name</p>
				<p className="col-span-4">Email</p>
			</div>
				{buyerList &&
          buyerList.map((buyer, index) => {
            return (
              <div key={index} className={(index%2===0) ? 
							"w-full h-fit bg-white grid grid-cols-9 justify-items-start py-2 px-4 gap-4 hover:bg-yellow"
							:  "w-full h-fit bg-gray grid grid-cols-9 justify-items-start py-2 px-4 gap-4 hover:bg-yellow"
							}>
                <p className="col-span-1">{index+1}</p>
                <p className="col-span-4">{buyer.Name}</p>
                <p className="col-span-4">{buyer.Email}</p>
              </div>
            );
          })}
      </div>
      <Footer />
    </>
  );
};

export default Customer;