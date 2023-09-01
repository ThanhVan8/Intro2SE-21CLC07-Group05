import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import payment from "../assets/payment.png";
import { FaUserCircle, FaShoppingBasket } from "react-icons/fa";
import OrderSumCard from "../components/OrderSumCard";
import useAuth from "../custom_hooks/useAuth";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const buyer = useAuth();
	const [user, setUser] = useState({})
  const [foods, setFoods] = useState([]);
  const [indices, setIndices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [description, setDescription] = useState([]);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [merchant, setMerchant] = useState();

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const docRef = await addDoc(collection(firestore, "Order"), {
      Food: indices,
      M_ID: merchant,
      O_ID: buyer.uid,
      Quantity: quantities,
      Status: "Preparing",
      Total: total,
    });

    const CartRef = doc(firestore, "ShoppingCart", buyer.uid);
    await updateDoc(CartRef, {
      Food: [],
      Quantity: [],
      merchant_id: '',
    });

    navigate("/OrderStatus");
  }

  const getOrderDetail = async (uid) => {
    try {
			const UserRef = doc(firestore, "User", uid);
      const docSnapUser = await getDoc(UserRef);
			setUser(docSnapUser.data())

      //fetch data from categories
      const OrderRef = doc(firestore, "ShoppingCart", uid);
      const docSnap = await getDoc(OrderRef);

      const food_list = docSnap.data()["Food"];
      setIndices(food_list)
      setQuantities(docSnap.data()['Quantity'])
      const merchant_id = docSnap.data().merchant_id;
      setMerchant(merchant_id)
      const quantity_list = docSnap.data()["Quantity"];
      const pricelist = [];

      for (let i = 0; i < food_list.length; i++) {
        const menuRef = doc(firestore, "Menu", merchant_id);
        const docSnap = await getDoc(menuRef);
        
        const price = docSnap.data().Price[food_list[i]];

        pricelist.push(price);

        setFoods((foods) => [
          ...foods, 
          docSnap.data().FoodList[food_list[i]]
        ]);
        setPrices((prices) => [
          ...prices, 
          docSnap.data().Price[food_list[i]]
        ]);
        setDescription((description) => [
          ...description,
          docSnap.data().Description[food_list[i]],
        ]);
        setImages((images) => [
          ...images, 
          docSnap.data().Image[food_list[i]]
        ]);
      }

      //making order, set to order collection
      var sum = 0;
      for (let i = 0; i < pricelist.length; i++) {
        sum += Number(pricelist[i]) * quantity_list[i];
      }
      sum += 20000
      setTotal(sum)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (buyer) {
      getOrderDetail(buyer.uid);
    }
  }, [buyer]);

  return (
    <>
      <Header />
      <div className="w-full mt-16 p-6 md:pr-0 py-5 min-h-screen">
        <div className="grid grid-cols-3 md:grid-cols-4 w-full gap-4">
          {/* Content */}
          <div className="col-span-3 flex flex-col gap-7 items-center ">
            {/* User info */}
            <div className="flex gap-8 bg-white border w-5/6 py-4 p-4 h-fit shadow-sm font-mono">
              {/* avatar */}
              <div className="flex flex-col justify-center gap-2">
                <FaUserCircle className="text-4xl text-textColor" />
                <p className="capitalize text-center font-semibold font-serif">
                  {user.Name}
                </p>
              </div>
              {/* info */}
              <div className="flex flex-col gap-4 w-full px-2">
                <label className="space-y-2">
                  <p className="text-textColor font-semibold text-base">
                    Address
                  </p>
                  <input
                    type="text"
                    defaultValue={user.Address}
                    className="border-b-2 border-black w-full outline-none text-gray-500"
                    readOnly
                  />
                </label>
                <label className="space-y-2">
                  <p className="text-textColor font-semibold text-base">
                    Phone number
                  </p>
                  <input
                    type="text"
                    defaultValue={user.Phone}
                    className="border-b-2 border-black w-full outline-none text-gray-500"
                    readOnly
                  />
                </label>
              </div>
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-3 bg-white border w-5/6 p-3 h-fit shadow-sm font-mono">
              <p className="text-textColor font-semibold text-xl font-serif ">
                Order Summary
              </p>
              {foods ? (
                <>
                  {foods.map((food, index) => {
                    return (
                      <OrderSumCard
                        name={food}
                        description={description[index]}
                        quantity={quantities[index]}
                        price={prices[index]}
                        image={images[index]}
                      />
                    );
                  })}
                  <div className="flex justify-between mt-2 text-base">
                    <p className="text-textColor">Shipping fee</p>
                    <p className="text-textColor">20000 VND</p>
                  </div>
                  <div className="flex justify-between text-base">
                    <p className="text-textColor">Total</p>
                    <p className="text-textColor font-semibold">{total} VND</p>
                  </div> 
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <FaShoppingBasket className="text-9xl text-disabled" />
                  <p className="text-disabled font-medium">
                    Your cart is empty
                  </p>
                </div>
              )}
            </div>
            {/* Button */}
            <button
              className="w-fit px-4 py-2.5 bg-primary text-white font-medium rounded-3xl hover:opacity-75 font-mono text-base capitalize"
              onClick={(e) => handlePlaceOrder(e)}
            >
              Place order
            </button>
          </div>

          {/* Picture */}
          <div className="hidden md:flex justify-end items-center">
            <img
              src={payment}
              alt="mainpic"
              className="h-3/4 object-contain sticky"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;