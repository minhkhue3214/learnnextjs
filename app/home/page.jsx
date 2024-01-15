import axios from 'axios';
import AddCartBtn from '../components/AddCartBtn'
import HomeNavBar from '../components/HomeNavBar';


async function getProducts() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products');
        const data = response.data;
        // console.log("res", data);
        return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

const page = async () => {
    const products = await getProducts()
    return (
        <div className='bg-gray-800 w-full h-full'>
            <HomeNavBar />
            <div className='flex flex-wrap bg-green-400 w-full mt-4'>
                {
                    products?.map((product, index) => {
                        return <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg border-2 border-gray-500 bg-blue-400 m-2">
                            <img className="w-full h-80 object-cover" src={`http://127.0.0.1:8000${product.image}`} />
                            <div className="flex justify-around px-2 py-2">
                                <div className="font-bold text-xl mb-2">{product.name}</div>
                                <div className="font-bold text-xl mb-2">{product.price}</div>
                            </div>
                            <div className='flex px-10 mb-2'>
                                {/* <button href="/" onClick={() => addToCart(product)} className='bg-red-300 w-24 p-2 rounded'>Buy</button> */}
                                <AddCartBtn product={product} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default page