import React, { useState } from 'react'
import ShopCard from '../components/ShopCard'
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom"

const ShopList = () => {
	const { id } = useParams();
	

	const [list, setList] = useState([
		{img: 1, name:'KFC'},
		{img: 1, name:'KFC'},
		{img: 1, name:'KFC'},
		{img: 1, name:'KFC'},
		{img: 1, name:'KFC'},
	])
  return (
    <div>
        <Header />
        <div className='grid md:grid-cols-3 gap-3 mt-24 mb-16 px-10'>
					{list && list.map((data) =>{
						return(
							<ShopCard image={data.img} name={data.name}/>)
					})}
        </div>
        <Footer />
    </div>
  )
}

export default ShopList