import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header0 from "../components/Header/Header0";
import Footer from "../components/Footer";
import mainpic from "../assets/mainpic.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      toast.success('Sign in successfully!', {
        autoClose: 3000, // Thời gian tự đóng toast (milisecond)
      });
      navigate("/");

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header0 />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full pt-16">

        <div className="flex flex-col justify-center px-5">
          <form className="w-4/5 mx-auto px-10 py-5 flex flex-col items-center rounded-3xl shadow-xl" onSubmit={signIn}>
            <h2 className="text-2xl text-center font-serif font-semibold py-1">Sign in</h2>
            <div className="flex flex-col py-2 w-full text-base font-mono">
              <label htmlFor="email">Email</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2 w-full text-base font-mono">
              <label htmlFor="password">Password</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className=" px-7 py-2.5 my-5 bg-primary text-white text-base font-mono rounded-3xl hover:opacity-75"
            type="submit">
              Sign in
            </button>
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

export default Signin;
