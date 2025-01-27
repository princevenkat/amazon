import Image from "next/image";
import {StarIcon} from "@heroicons/react/solid"
import Currency from 'react-currency-formatter'

import {addToBasket, removeFromBasket} from '../slices/basketSlice'
import { useDispatch } from "react-redux";

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
}) {
    const dispatch = useDispatch()
    const addItemToBasket = () =>{
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        };

        dispatch(addToBasket(product));
    }

    const removeItemFromBasket = () =>{
        dispatch(removeFromBasket({id}));
    }


    return (
        <div className='grid grid-cols-5'>
            <Image src={image} height={200} width={200} objectFit='contain' />

            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon className='h-5 text-yellow-500' />
                    ))

                    }
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <p className='flex z-30 mb-6'><Currency quantity={price} currency='INR' /></p>
                {hasPrime && (
                    <div className='flex items-center space-x-2 -mt-5'>
                        <img loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}

            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button onClick={addItemToBasket} className='button'>Add to Basket</button>
                <button onClick={removeItemFromBasket} className='button'>Remove from Basket</button>
            </div>
            {/* <button className='button mx-auto'></button> */}
        </div>
    )
}

export default CheckoutProduct
