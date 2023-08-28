import React, {useState} from 'react'

const OrderCard = ({detail, buyerInfo}) => {
	const [status, setStatus] = useState(detail.Status)
	const handleClickStatus = (statusName) => {
		setStatus(statusName)
	}
  return (
    <div className='w-full h-fit grid grid-rows-5 justify-items-start px-4 gap-2 bg-gray'>
        <div className ='w-full flex justify-between items-center gap-4 py-2'>
            <div className='text-base font-semibold'>ID</div>
            <div className='text-base'>{detail.id}</div>
        </div>
 
        <div className='w-full h-fit grid grid-cols-6 justify-items-start gap-4 row-span-3'>
					<div className='w-full col-span-3 grid grid-cols-1 gap-2'>
            {detail && detail.Food.map((foodDetail, index) => {
							return (
									<div className='w-full flex justify-items-start gap-8 items-center'>
											<div className='text-base'>{detail.Quantity[index]}x</div>
											<div className='text-base'>{foodDetail}</div>
									</div>             
							)
						})}
					</div>	
            {/* Cus in4 */}
            {buyerInfo &&
            <div className='w-full col-span-2 flex-col px-4'>
                <div className='text-base font-semibold'>{buyerInfo.Name}</div>
                <div className='text-base '>{buyerInfo.Phone}</div>
                <div className='text-base '>{buyerInfo.Address}</div>
            </div>
            }
            {/* check box */}
            {status &&
            <div className='w-full grid grid-rows-3 justify-end '>
                <label className='p-2 flex gap-2 '>
                    <input  type="radio" 
                            className="w-4 h-4"
                            checked={status === 'Preparing'}
							onClick={() => handleClickStatus('Preparing')} />
                    <span> Preparing </span>
                </label>
                <label className='p-2 flex gap-2 '>
                    <input  type="radio" 
                            className=" w-4 h-4" 
							checked={status === 'Delivering'}
							onClick={() => handleClickStatus('Delivering')} />
                    <span> Delivering </span>
                </label>

                <label className='p-2 flex gap-2 '>
                    <input  type="radio" 
                            className="w-4 h-4" 
							checked={status === 'Delivered'}
							onClick={() => handleClickStatus('Delivered')}/>
                    <span> Delivered </span>
                </label>
            </div>
            }
        </div>
        
        {detail &&
        <div className='w-full flex justify-between'>
            <div className='text-base font-semibold'>Price</div>
            <div className='text-base'>{detail.Total}</div>
        </div>
        }
    </div>
  )
}

export default OrderCard