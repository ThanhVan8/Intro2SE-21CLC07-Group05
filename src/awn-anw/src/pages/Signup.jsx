import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header0 from "../components/Header/Header0";
// import Footer from "../components/Footer/Footer";
import mainpic from "../assets/mainpic.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, getDocs, getCountFromServer } from "firebase/firestore";
import { storage } from "../config/firebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from "../config/firebase";
import { auth } from "../config/firebase";

const Signup = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const UserCollectionRef = collection (firestore, "User")
    const signup = async(e) =>{
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
            auth,
            email, 
            password
            );
            
            const user = userCredential.user;


            await setDoc(doc(firestore, "User", user.uid), {
                Name: name,
                Phone: phone,
                Address: address,
                email
            });

            await setDoc(doc(firestore, "ShoppingCart",user.uid), {
              Food: [],
              Quantity: [],
              merchant_id: ''
            });

            toast.success('Sign up successfully!', {
              autoClose: 3000, // Thời gian tự đóng toast (milisecond)
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
          <form className="w-4/5 mx-auto px-10 py-5 flex flex-col items-center rounded-3xl shadow-xl" onSubmit={signup}>
            <h2 className="text-2xl text-center font-semibold font-serif py-1 capitalize">Sign up</h2>
            <div className="flex flex-col py-2 w-full text-base">
              <label htmlFor="email">Name</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2 w-full text-base">
              <label htmlFor="email">Phone number</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2 w-full text-base">
              <label htmlFor="email">Address</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2 w-full text-base">
              <label htmlFor="email">Email</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2 w-full text-base">
              <label htmlFor="password">Password</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
                className="px-7 py-2.5 my-5 bg-primary text-white rounded-3xl hover:opacity-75 text-base capitalize"
                type="submit"
            >
              Sign up
            </button>
            <p className="text-base">
              Already have an account?{" "}
              <Link
                className="text-primary underline hover:opacity-75"
                to="/Signin"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:flex justify-end items-center overflow-hidden">
          <img
            src={mainpic}
            alt="mainpic"
            className="h-3/4"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;