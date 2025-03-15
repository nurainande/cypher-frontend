
import  { useState } from "react";
// import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/ContextProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  // const {setUser}=useAppContext()
  const { getUserDetails,user,setUser } = useAppContext();

  // State for form data, errors, loading, and success message
  const [formData, setFormData] = useState({
    email: "nurainande@gmail.com",
    password: "123456",
  });
  const [errors, setErrors] = useState({});
  // const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validate = () => {
    let errors = {};
    if (!formData.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid.";
    if (!formData.password) errors.password = "Password is required.";
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
       try {
         const dataResponse = await fetch(
           `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/signin`,
           {
             method: "POST",
             credentials: "include",
             headers: {
               "content-type": "application/json",
             },
             body: JSON.stringify(formData),
           }
         );

         const dataApi = await dataResponse.json();
         console.log("dataApi", dataApi);

         if (dataApi.success) {
           // toast.success(dataApi.message);
           navigate("/");
           getUserDetails();

           // set user
           setUser(dataApi.data);
         }

         if (dataApi.error) {
           // toast.error(dataApi.message);
         }
       } catch (error) {
         //   toast.error("Login failed!");
         console.error(error);
       }
    }
  };
  if(user){
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center">
          Login to Your Account
        </h2>

        {/* {successMessage && (
          <div className="p-4 text-green-800 bg-green-100 rounded-md">
            {successMessage}
          </div>
        )} */}

        {errors.apiError && (
          <div className="p-4 text-red-800 bg-red-100 rounded-md">
            {errors.apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="********"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
