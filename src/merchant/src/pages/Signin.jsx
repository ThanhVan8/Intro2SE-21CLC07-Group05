import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Header0 from "../components/Header/Header0";
import mainpic from "../assets/mainpic.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import InputField from "../components/InputField";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const signIn = async(e) => {

    e.preventDefault();

    try{

      const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
      );


      const user = userCredential.user

      console.log(user);
      toast.success('Sign in successfully!', {
        autoClose: 1000, // Thời gian tự đóng toast (milisecond)
      });
      navigate("/");


    } catch(error){
      toast.error(error.message, {
        autoClose: 1000, // Thời gian tự đóng toast (milisecond)
      });
      
    }
  }

  return (
    <>
      <Header0 />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full pt-16">

        <div className="flex flex-col justify-center px-5">
          <form className="w-4/5 mx-auto px-10 py-5 flex flex-col items-center rounded-3xl shadow-xl"onSubmit={signIn}>
            <h2 className="text-2xl text-center font-semibold py-1">Sign in</h2>
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
              Sign in
            </button>
            <p>
              Don't have an account?{" "}
              <Link
                className="text-primary underline hover:opacity-75"
                to="/Signup"
            	>
                Sign up
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

export default Signin;
