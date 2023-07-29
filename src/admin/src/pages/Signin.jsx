import React, { useState } from "react";
import Header0 from "../components/Header/Header0";
import mainpic from "../assets/mainpic.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header0 />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full pt-16">

        <div className="flex flex-col justify-center px-5">
          <form className="w-4/5 mx-auto px-10 py-5 flex flex-col items-center rounded-3xl shadow-xl">
            <h2 className="text-2xl text-center font-semibold py-1">Sign in</h2>
            <div className="flex flex-col py-2 w-full">
              <label htmlFor="email">Email</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2 w-full">
              <label htmlFor="password">Password</label>
              <input
                className="border border-[#D9D9D9] p-2 rounded-[10px]"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-28 px-7 py-2.5 my-5 bg-primary text-white rounded-3xl hover:opacity-75">
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