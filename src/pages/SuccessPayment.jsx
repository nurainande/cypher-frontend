import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai"; 

const SuccessPayment = () => {
  const navigate = useNavigate();

  // Function to navigate to the orders page
  const handleViewOrders = () => {
    navigate("/order-details"); // Assuming your order page route is '/orders'
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
