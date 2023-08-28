import React, { useState, useEffect, useMemo } from 'react';
import cake from "../assets/cake.jpg"
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";



const Card = () => {

    const [count, setCount] = useState(0);

    function handleAddClick() {
      setCount(count + 1);
    }

    function handleMinClick() {
        if(count>1)
            setCount(count - 1);
    }

  return (
    <>
        <div className='overflow-auto grid grid-cols-1 gap-4 grid-flow-row justify-center items-center px-2 mb-12 mt-4 max-h-240 '>
                <div className='border rounded-3xl border-black p-2 h-120 px-2 mx-4'>
                    <div className='grid grid-cols-4 gap-2 justify-center items-center'>
                        {/* Image */}
                        <div className='w-fit'>
                            <img src={cake} alt="Food image" className='object-cover h-20 w-20 rounded-full' />
                        </div>
                        {/* Infor */}
                        <div className='col-span-2 grid grid-rows-3'>
                            <div className='text-xl font-semibold'>Chesse cake</div>
                            <div className='opacity-40'>Sweet</div>
                            <div className='flex flex-row justify-start items-center gap-2 h-full'>
                                <button onClick={handleMinClick}>
                                    <FaMinusCircle className='h-5 w-5 text-primary hover:opacity-80'/>
                                </button>
                                <div className='h-6 w-fit border border-black px-2'>{count}</div>
                                <button onClick = {handleAddClick}>
                                    <FaPlusCircle className='h-5 w-5 text-primary hover:opacity-80'/>
                                </button>
                            </div>
                        </div>
                        {/* Price */}
                        <div className='text-textColor font-semibold justify-self-end self-end'>
                            30.000 VND
                        </div>

                    </div>

                    
                </div>
        </div>
    </>
    )
}

export default Card