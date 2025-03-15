import { useState } from "react";
import { useAppContext } from "../Context/ContextProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutPage = () => {
  const { state } = useAppContext();
  const stripe = useStripe();
  const elements = useElements(); // To access card details entered

  const totalPrice = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [cartInfo, setCartInfo] = useState({
    cartList: state.cart,
    totalPrice,
  });
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  async function handlePlaceOrder() {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    setIsProcessing(true); // Disable the button during processing

    // 1. Create PaymentIntent on the server
    const response = await fetch(
      "https://your-server.com/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round((totalPrice + totalPrice * 0.1) * 100), // Amount in cents
        }),
      }
    );

    const { clientSecret } = await response.json();

    // 2. Confirm the payment on the client side
    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: personalInfo.fullName,
            address: {
              line1: personalInfo.address,
              city: personalInfo.city,
              state: personalInfo.state,
              postal_code: personalInfo.zipCode,
            },
          },
        },
      }
    );

    if (error) {
      console.error(error);
      alert("Payment failed: " + error.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);

      // 3. After successful payment, create an order
      const orderData = {
        cartItems: cartInfo.cartList,
        totalAmount: cartInfo.totalPrice,
        shippingAddress: personalInfo,
        paymentStatus: "Paid",
      };

      const orderResponse = await fetch("https://your-api.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (orderResponse.ok) {
        const order = await orderResponse.json();
        console.log("Order created successfully:", order);
        alert("Order placed successfully!");
      } else {
        console.error("Failed to create order");
      }
    }

    setIsProcessing(false);
  }

  return (
    <main className="py-24 px-4 lg:px-24">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <article className="border p-6 rounded-lg shadow-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {state.cart.map((item) => (
            <div key={item._id} className="flex justify-between mb-4">
              <span>
                {item.productName} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
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
        </article>

        {/* Shipping and Payment Information */}
        <section className="space-y-6">
          <article className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            {/* Shipping info form */}
          </article>

          <article className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
            {/* Stripe Card Element for card input */}
            <CardElement options={{ hidePostalCode: true }} />
          </article>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </section>
      </section>
    </main>
  );
};

export default CheckoutPage;
