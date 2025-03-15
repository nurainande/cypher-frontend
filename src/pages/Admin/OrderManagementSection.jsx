import { useState, useEffect } from "react";

// Sample orders data (this would typically come from a backend)
const initialOrders = [
  {
    id: 1,
    customerName: "John Doe",
    product: "Smartphone XYZ",
    quantity: 2,
    totalPrice: 1198,
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    product: "Laptop ABC",
    quantity: 1,
    totalPrice: 999,
    status: "Shipped",
  },
  {
    id: 3,
    customerName: "Michael Johnson",
    product: "Wireless Earphones",
    quantity: 3,
    totalPrice: 447,
    status: "Delivered",
  },
];

const OrderManagementSection = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend or set initial data
  useEffect(() => {
    // Ideally, you'd fetch orders from an API here
    // Example: fetch("/api/orders").then(res => res.json()).then(data => setOrders(data));
    setOrders(initialOrders);
  }, []);

  // Handle deleting an order
  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    // Make DELETE request to backend here
  };

  // Handle updating order status
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    // Make a PUT/PATCH request to update the status on the backend
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Manage Orders</h1>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Total Price ($)
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.product}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="p-2 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderManagementSection;