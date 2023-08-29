import React, { useState, useEffect } from 'react';
import ShopCard from '../components/ShopCard'
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom"
import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import {Link} from "react-router-dom";

const ShopList = () => {
	const { id } = useParams();

  const [MerchantDetail, setMerchant] = useState([])

	const fetchMerchant = async(id) => {
		try{
			const MerchantRef = collection(firestore, "Merchant")
			const q = query(MerchantRef, where ("Categories", "array-contains", id));
			const querySnapshot = await getDocs(q)
			let merchantList = []
			querySnapshot.forEach((doc) => {
				const OrderData = {...doc.data(), id: doc.id};
        // console.log(OrderData);
				merchantList.push(OrderData)
			})
			setMerchant(merchantList)
		}catch(err){
		  console.error(err);
		}
	};
	
	  useEffect(() => {
			fetchMerchant(id);
	  },[])

  	return (
    <div>
        <Header />
        <div className='grid md:grid-cols-3 gap-3 mt-24 mb-16 px-10'>
					{MerchantDetail && MerchantDetail.map((data) =>{
						return(
							<Link key={data.id} to = {`/Menu/${data.id}`}>
								<ShopCard image={data.img} name={data.Name}/>
							</Link>
						)
					})}
        </div>
        <Footer />
    </div>
  )
}

export default ShopList