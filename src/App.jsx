import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import  { useAppContext } from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { getUserDetails,user } = useAppContext();
  const navigate = useNavigate()

  const stripeKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
  console.log(stripeKey)
  useEffect(() => {
    const fetchUserDetails = async () => {
      await getUserDetails(); // Wait for getUserDetails to complete
    };

    fetchUserDetails();

    if (user?.role === "admin") {
      navigate("/admin/products");
    }
  }, []);
  
  return (
    <div className="">
      <Toaster/>
      <Header />
      <main className="h-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

