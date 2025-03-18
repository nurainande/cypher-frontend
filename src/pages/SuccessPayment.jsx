// import { useNavigate } from "react-router-dom";
// import { AiOutlineCheckCircle } from "react-icons/ai"; 
// import { useEffect, useState } from "react";
// import { useAppContext } from "../Context/ContextProvider";
// const SuccessPayment = () => {
//   const [orderId, setOrderId] = useState("");
//   const { user } = useAppContext();
//   console.log(user);
//   const orderUser = user?.email;
//   console.log(orderUser);
//   const navigate = useNavigate();

//   async function fetchOrders() {
//     const res = await fetch(
//       `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/order/get-order`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: orderUser }),
//       }
//     );
//     const data = await res.json();
//     console.log(data);
//     console.log(data.data[0]?._id);

//     if (data.success) {
//       setOrderId(data.data[0]?._id);
//     } else {
//       console.error(data.error);
//     }
//   }

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     if (orderUser) {
//       fetchOrders();
//     }
//   }, [orderUser]); // Fetch only when user email is available

//   // Function to navigate to the orders page
//   const handleViewOrders = () => {
//     navigate(`/order-details/${orderId}`); // Assuming your order page route is '/orders'
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-md shadow-lg text-center max-w-lg">
//         {/* Success Icon */}
//         <AiOutlineCheckCircle className="w-24 h-24 text-green-500 mx-auto" />

//         {/* Success Text */}
//         <h1 className="text-2xl font-bold mt-4 text-gray-800">
//           Payment Successful!
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Thank you for your purchase. Your order has been processed
//           successfully.
//         </p>

//         {/* Button to View Orders */}
//         <button
//           onClick={handleViewOrders}
//           className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
//         >
//           See Orders
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SuccessPayment;








import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useAppContext } from "../Context/ContextProvider";

const SuccessPayment = () => {
  const [orderId, setOrderId] = useState("");
  const { user } = useAppContext();
  const orderUser = user?.email;
  const navigate = useNavigate();

  async function fetchOrders(userEmail) {
    if (!userEmail) return; // Prevents calling API with undefined email

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/order/get-order`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const data = await res.json();
      console.log(data);
      console.log(data?.data?.[0]?._id || "No order found");

      if (data.success) {
        setOrderId(data?.data?.[length]?._id || "No Order ID");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }

  useEffect(() => {
    if (orderUser) {
      fetchOrders(orderUser);
    }
  }, [orderUser]); // Fetch orders only when `orderUser` is available

  // Function to navigate to the orders page
  const handleViewOrders = () => {
    if (!orderId) {
      console.error("No order ID available.");
      return;
    }
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg text-center max-w-lg">
        {/* Success Icon */}
        <AiOutlineCheckCircle className="w-24 h-24 text-green-500 mx-auto" />

        {/* Success Text */}
        <h1 className="text-2xl font-bold mt-4 text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>

        {/* Button to View Orders */}
        <button
          onClick={handleViewOrders}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
          See Orders
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;
