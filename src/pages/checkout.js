import Image from "next/image"
import { useSelector } from "react-redux"
import Header from "../components/Header"
import CheckoutProduct from "../components/CheckoutProduct"
import { selectItems, selectTotal } from "../slices/basketSlice"
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/client"
import Head from "next/head"

function Checkout() {

    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)

    const [session] = useSession()

    return (
        <div className='bg-gray-100'>
       <Head>
        <title>Amazon Clone Reactjs</title>
      </Head>
            <Header />


            <main className='lg:flex max-w-screen-2xl mx-auto'>

                {/* Left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image 
                        src='https://links.papareact.com/ikj' 
                        width={1020} 
                        height={250} 
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? 'Your Shopping Basket is empty' : 'Shopping Basket'}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct 
                                key={i}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}




                    </div>

                </div>



                {/* Right */}

                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items): 
                                <span className='font-bold'>
                                    <Currency quantity={total} currency='INR' />
                                </span>
                            </h2>
                            <button 
                            disabled={!session}
                            className={`button mt-2 ${!session &&  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed focus:ring-2 focus:ring-gray-300 active:from-gray-300'}`}>
                                {!session ? 'Sign in to Checkout' : 'Proceed to Checkout' }
                            </button>
                        </>
                    )}
                </div>

            </main>

        </div>
    )
}

export default Checkout
