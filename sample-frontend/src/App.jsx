// import React from 'react'
// import { useState } from 'react';
import Factorial from "./Factorial";
const App = () => {
    return(
      <>
      <Factorial/>
      
      <div className="bg-[url(https://img.freepik.com/premium-photo/bright-butter-yellow-background-with-smooth-finisheyellow-background-futuristic-texture-image_1020697-744579.jpg?semt=ais_hybrid&w=740&q=80)] bg-no-repeat w-100% bg-cover h-150 p-5 flex flex-col justify-center items-center ">
      <h1 className="w-100 text-center font-bold bg-sky-200 m-3 p-5 text-2xl rounded-4xl shadow -2xl shadow-pink-400 underline decoration-amber-300 decoration-[4px]">Sample Project</h1>

      <h2 className= "backdrop-blur-5xl w-50 text-center text-2xl font-bold shadow-2xl shadow-yellow-500 rounded-3xl text-red-950 items-center">Welcome to Tailwind CSS</h2>

        <div className="bg-pink-800 p-10 grid grid-cols-4 gap-x-2 gap-y-2 rounded-2xl">
        <div className="bg-pink-400 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-400 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-300 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-300 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-300 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-200 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-200 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-200 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-300 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-300 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-400 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
        <div className="bg-pink-400 h-10 w-30 rounded-2xl shadow-2xl shadow-pink-400"></div>
      </div>
    </div>

    </>

    );
  };

export default App;