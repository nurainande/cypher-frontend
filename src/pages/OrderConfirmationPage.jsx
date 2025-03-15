import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  const orderDetails = {
    orderNumber: "123456789",
    shippingAddress: {
      name: "John Doe",
      addressLine1: "123 Main St",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    items: [
      { name: "Product 1", quantity: 2, price: 20 },
      { name: "Product 2", quantity: 1, price: 50 },
      { name: "Product 3", quantity: 3, price: 10 },
    ],
    totalCost: 130,
  };

  return (
    <section className="p-8 md:p-16 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-12 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Order Confirmation
        </h1>

        {/* Order Number */}
        <p className="text-lg mb-6">
          Thank you for your purchase! Your order number is{" "}
          <span className="font-semibold">{orderDetails.orderNumber}</span>.
        </p>

        {/* Shipping Address */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <p>{orderDetails.shippingAddress.name}</p>
          <p>{orderDetails.shippingAddress.addressLine1}</p>
          <p>{orderDetails.shippingAddress.addressLine2}</p>
          <p>
            {orderDetails.shippingAddress.city},{" "}
            {orderDetails.shippingAddress.state}{" "}
            {orderDetails.shippingAddress.zip},{" "}
            {orderDetails.shippingAddress.country}
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b-2">
                <th className="py-2">Item</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Cost */}
        <div className="text-xl font-semibold mt-6">
          Total: ${orderDetails.totalCost.toFixed(2)}
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

export default OrderConfirmationPage;
