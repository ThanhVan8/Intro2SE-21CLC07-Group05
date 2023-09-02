import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAuth } from 'firebase/auth'
import { firestore } from '../config/firebase'
import useAuth from '../custom_hooks/useAuth'
import { collection, getDoc, getDocs, query, where, doc, or } from 'firebase/firestore'
import OrderCard from '../components/OrderCard';

const Order = () => {

    const [OrderDetail, setOrder] = useState([])
    const [idOrders, setIdOrders] = useState([])
    const [BuyerDetail, setBuyer] = useState([])
    const [Food, setFood] = useState([])
    const merchant = useAuth();
    const getOrder = async(uid) => {
        try{
          const OrderRef = collection(firestore, "Order")
          const FoodRef = doc(firestore, "Menu", uid)
          let order = []
          let buyer = []
          let food = []
          let u_id = []
          let foodList = []
          const q = query(OrderRef, where ("M_ID", "==", uid));
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {
            const OrderData = doc.data();
            order.push(OrderData);
            setIdOrders(idOrders => [...idOrders, doc.id])
            u_id.push(OrderData.O_ID);
            food.push(OrderData.Food);
          })
          setOrder(order); // So luong cua tung mon an

          for(let i = 0; i < food.length; i++){
            let food_list = []
            for(let j = 0; j < food[i].length; j++){
              const docSnap = await getDoc(FoodRef)
              const FoodData = docSnap.data()['FoodList']
              food_list.push(FoodData[food[i][j]])
            }
            foodList.push(food_list)
            
          }
          // console.log(foodList);
          setFood(foodList); // Ten cua tung mon an

          for (let i = 0; i < u_id.length; i++){
            const BuyerRef = doc(firestore, "User", u_id[i])
            const docSnap = await getDoc(BuyerRef)
            const Buyer = docSnap.data();
            buyer.push(Buyer);
          }
          setBuyer(buyer); //Thong tin khach hang
        } catch(err){
          console.error(err)
        }
      };

    useEffect(() => {
        if(merchant){
            getOrder(merchant.uid);
        }
    }, [merchant])
    return (
    <>
        <Header/>
        {/* container */}
        <div className='w-full min-h-screen mt-16 py-16 px-16 grid gap-4 font-mono text-base'>
            {/* an order */}
            {OrderDetail && OrderDetail.map((detailedInfo, index) => {
              return (
                <OrderCard key={index} detail={detailedInfo} buyerInfo={BuyerDetail[index]} foodNames={Food[index]} idOrder={idOrders[index]}/>
              )
            })}
        </div>
        <Footer/>
    </>
  )
}

export default Order