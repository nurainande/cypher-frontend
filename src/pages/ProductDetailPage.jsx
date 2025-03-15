import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../Context/ContextProvider";

const ProductDetail = () => {
  // Sample product details
  // const product = {
  //   id: 1,
  //   name: "Smartphone X Pro",
  //   image: "https://via.placeholder.com/400x400", // Placeholder image
  //   description:
  //     "The Smartphone X Pro features a stunning display, powerful performance, and an incredible camera to capture every moment.",
  //   price: "$999",
  //   details: [
  //     "6.5-inch OLED display",
  //     "128GB storage",
  //     "Triple-lens camera system",
  //     "5G enabled",
  //     "Face ID",
  //   ],
  // };
  const [singleProduct,setSingleProduct] = useState({})
  const {id}=useParams()
  const { state, dispatch} = useAppContext();
  const navigate = useNavigate()

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
    // toast.success(`${product.name} added to cart`);
  }


  useEffect(() => {
   async function fetchsingleProduct(){
     try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/product/${id}`
        );
        const data = await response.json();
        console.log(data)
        setSingleProduct(data.data);
     } catch (err) {
       console.error("Error fetching product:", err);
     }
    }
    fetchsingleProduct()
  }, [])

  
  

  return (
    <div className="py-24 px-4 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <section>
          <img
            src={singleProduct.productImage}
            alt={singleProduct.name}
            className="w-full  md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
          />
        </section>

        {/* Product Details */}
        <section>
          <h1 className="text-3xl font-bold mb-4">{singleProduct.productName}</h1>
          <p className="text-lg mb-4">{singleProduct.description}</p>
          <p className="text-xl font-semibold text-red-500 mb-4">
            {singleProduct.price}
          </p>
          <p>{state.cart.length}</p>

          {/* Additional Details */}
          {/* <ul className="list-disc pl-5 space-y-2">
            {product.details.map((detail, index) => (
              <li key={index} className="text-gray-700">
                {detail}
              </li>
            ))}
          </ul> */}

          {/* Action Buttons */}
          <div className="mt-6">
            <button onClick={()=>{
              addToCart(singleProduct)
              navigate("/shopping-cart");
            }} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>
            <button className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 ml-4">
              Buy Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
