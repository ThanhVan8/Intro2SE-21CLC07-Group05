import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header0 from "../components/Header/Header0";
import mainpic from "../assets/mainpic.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, getDocs, getCountFromServer } from "firebase/firestore";
import { storage } from "../config/firebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from "../config/firebase";
import { auth } from "../config/firebase";
import InputField from "../components/InputField";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const MerchantCollectionRef = collection (firestore, "Merchant")
  const navigate = useNavigate();

  const signup = async(e) =>{
      e.preventDefault();
      try {
          const userCredential = await createUserWithEmailAndPassword(
          auth,
          email, 
          password
          );

          const user = userCredential.user;
          await setDoc(doc(firestore, "Merchant", user.uid), {
              Name: name,
              Phone: phone,
              Address: address,
              email
          });

          await setDoc(doc(firestore, "Menu", user.uid), {
              FoodList: [],
              Price: []
          });

          toast.success('Sign up successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000, // Thời gian tự đóng toast (milisecond)
          });
          navigate("/Signin");

      } catch (error) {
          toast.error(error.message);
      }
  }

  return (
    <>
      <Header0 />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen pt-16">
        <div className="flex flex-col justify-center px-5">
          <form className="w-4/5 mx-auto px-10 py-5 flex flex-col items-center rounded-3xl shadow-xl"onSubmit={signup}>
            <h2 className="text-2xl text-center font-semibold py-1">Sign up</h2>
            
            <InputField 
              label="Store name" 
              type="text" 
              required={true} 
              value={name} 
              onChange={(e) => setName(e.target.value)} />
            <InputField 
              label="Phone number" 
              type="tel" 
              required={true} 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} />
            <InputField 
              label="Adress" 
              type="text" 
              required={true} 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} />
            <InputField 
              label="Email" 
              type="email" 
              required={true} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} />
            <InputField 
              label="Password" 
              type="password" 
              required={true} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} />
                
            <button className="w-28 px-7 py-2.5 my-5 bg-primary text-white rounded-3xl hover:opacity-75">
              Sign up
            </button>
            <p>
              Already have an account?{" "}
              <Link
                className="text-primary underline hover:opacity-75"
                to="/Signin">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:flex justify-end items-center">
          <img
            src={mainpic}
            alt="mainpic"
            className="h-3/4 object-contain fixed"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;