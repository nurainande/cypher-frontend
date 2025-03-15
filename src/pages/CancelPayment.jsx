import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Importing cancel icon from react-icons

const CancelPayment = () => {
  const navigate = useNavigate();

  // Function to navigate back to the shop or checkout page
  const handleRetryPayment = () => {
    navigate("/checkout"); // Assuming your checkout page route is '/checkout'
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg text-center max-w-lg">
        {/* Cancel Icon */}
        <AiOutlineCloseCircle className="w-24 h-24 text-red-500 mx-auto" />

        {/* Cancel Text */}
        <h1 className="text-2xl font-bold mt-4 text-gray-800">
          Payment Canceled!
        </h1>
        <p className="text-gray-600 mt-2">
          Your payment was not completed. Please try again or contact support.
        </p>

        {/* Button to Retry Payment */}
        <button
          onClick={handleRetryPayment}
          className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default CancelPayment;
