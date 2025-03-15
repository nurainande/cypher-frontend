import { Link } from "react-router-dom";

// Example past order data
const pastOrders = [
  {
    orderNumber: "123456789",
    date: "2024-09-01",
    status: "Delivered",
    totalCost: 150,
  },
  {
    orderNumber: "987654321",
    date: "2024-08-25",
    status: "In Transit",
    totalCost: 85,
  },
  {
    orderNumber: "543216789",
    date: "2024-08-15",
    status: "Cancelled",
    totalCost: 200,
  },
];

const OrderHistoryPage = () => {
  return (
    <section className="p-8 md:p-16 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-12 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Order History
        </h1>

        {/* Orders List */}
        <div className="mb-8">
          {pastOrders.length > 0 ? (
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b-2">
                  <th className="py-2">Order Number</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Total</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {pastOrders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{order.orderNumber}</td>
                    <td className="py-2">{order.date}</td>
                    <td
                      className={`py-2 font-semibold ${
                        order.status === "Cancelled"
                          ? "text-red-500"
                          : order.status === "Delivered"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="py-2">${order.totalCost.toFixed(2)}</td>
                    <td className="py-2">
                      <Link
                        to={`/order/${order.orderNumber}`}
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-lg">You have no past orders.</p>
          )}
        </div>

        {/* Continue Shopping */}
        <div className="mt-8">
          <Link to="/products">
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-200">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderHistoryPage;
