import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAuth } from 'firebase/auth'
import { firestore } from '../config/firebase'
import useAuth from '../custom_hooks/useAuth'
import { collection, getDoc, getDocs, query, where, doc, or, updateDoc } from 'firebase/firestore'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const OrderCard = ({ detail, buyerInfo, foodNames, idOrder }) => {
  const [order, setOrder] = useState(detail);
  const [idOrders, setIdOrders] = useState(idOrder)
  const [status, setStatus] = useState(detail.Status);
//   console.log(idOrders)
  const handleClickStatus = (statusName) => {
    const OrderRef = doc(firestore, "Order", idOrders)
    updateDoc(OrderRef, {
        Status: statusName
    })
    setOrder({ ...order, Status: statusName });
    toast.success('Update successfully!', {
      autoClose: 1000, // Thời gian tự đóng toast (milisecond)
    });
  };
  return (
    <div className="w-full h-fit grid grid-rows-5 justify-items-start px-4 gap-2 bg-gray text-base">
      <div className="w-full flex justify-between items-center gap-4 py-2 text-lg">
        <div className="font-semibold">ID</div>
        <div>{idOrder}</div>
      </div>

      <div className="w-full h-fit grid grid-cols-6 justify-items-start gap-4 row-span-3">
        <div className="w-full col-span-3 grid grid-cols-1 gap-2">
          {foodNames &&
            foodNames.map((foodDetail, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-items-start gap-8 items-center"
                >
                  <div className="text-base">{order.Quantity[index]}x</div>
                  <div className="text-base">{foodDetail}</div>
                </div>
              );
            })
          }
        </div>
        <div className="w-full col-span-2 flex-col px-4">
          {buyerInfo && (
            <>
              <div className="text-base font-semibold">{buyerInfo.Name}</div>
              <div className="text-base ">{buyerInfo.Phone}</div>
              <div className="text-base ">{buyerInfo.Address}</div>
            </>
          )}
        </div>

        {order && (
          <div className="w-full grid grid-rows-3 justify-end ">
            <label className="p-2 flex gap-2 ">
              <input
                type="radio"
                className="w-4 h-4"
                checked={order.Status === "Preparing"}
                onClick={() => handleClickStatus("Preparing")}
              />
              <span> Preparing </span>
            </label>
            <label className="p-2 flex gap-2 ">
              <input
                type="radio"
                className=" w-4 h-4"
                checked={order.Status === "Delivering"}
                onClick={() => handleClickStatus("Delivering")}
              />
              <span> Delivering </span>
            </label>

            <label className="p-2 flex gap-2 ">
              <input
                type="radio"
                className="w-4 h-4"
                checked={order.Status === "Delivered"}
                onClick={() => handleClickStatus("Delivered")}
              />

              <span> Delivered </span>
            </label>
          </div>
        )}
      </div>

      {order && (
        <div className="w-full flex justify-between">
          <div className="text-base font-semibold">Price</div>
          <div className="text-base">{order.Total} VND</div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;