import { useState } from "react";
import { useAppContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginAndReg = () => {
  const [form, setForm] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("nurainande@gmail.com");
  const [password, setPassword] = useState("123456");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const { setUser, getUserDetails} = useAppContext();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const formData = { email, password };

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
      console.log(dataApi);

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        // fetchUserAddToCart();
        getUserDetails();

        // set user
        setUser(dataApi.data);
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Login failed!");
      console.error(error);
    }
  };

  async function handleSubmitReg(e) {
    e.preventDefault();
    const formData = { name, email, password, passwordConfirm };
    console.log(formData);

    try {
      const res = await fetch(
        `${import.meta.VITE_SERVER_DOMAIN}/api/v1/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);

      setForm("login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <section
        className="Auth-form"
        style={{ width: "400px", padding: "2rem", background: "" }}
      >
        <h2>Authentication</h2>
        <div
          className="buttons"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button onClick={() => setForm("login")}>Login</button>
          <button onClick={() => setForm("register")}>Register</button>
        </div>
        {form === "login" && (
          <form
            onSubmit={handleSubmitLogin}
            className="login"
            style={{ width: "100%" }}
          >
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Login</button>
          </form>
        )}
        {form === "register" && (
          <form onSubmit={handleSubmitReg} className="register">
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <br />
            <button type="submit">Register</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default LoginAndReg;
