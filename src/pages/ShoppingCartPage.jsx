import  { useState } from 'react';
import {Link} from "react-router-dom"
import { useAppContext } from "../Context/ContextProvider";

const ShoppingCartPage = () => {
  const { state } = useAppContext();
  // Sample data for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Smartphone X Pro',
      price: 999,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Laptop Z Ultra',
      price: 1999,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  // Calculate total price
   const totalPrice = state.cart.reduce(
     (total, item) => total + item.price * item.quantity,
     0
   );
  // const totalPrice = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="py-24 px-4 lg:px-24">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-2 max-w-2xl">
          {/* {cartItems.map((item) => ( */}
          {state.cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productImage}
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.productName}</h2>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border p-6 rounded-lg shadow-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Tax</span>
            <span>${(totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;

