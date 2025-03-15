/* eslint-disable */
import { useState, createContext, useContext,useReducer,useEffect } from "react";
const AppContext = createContext();


const getInitialState = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { cart: [] };
};

// Define reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the item is already in the cart
      const existingItem = state.cart.find(
        (item) => item._id === action.payload.id
      );
      if (existingItem) {
        // Update the quantity if it already exists
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // Add new item to the cart
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      // Remove item from cart
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log(user);

  const getUserDetails = async () => {
    const dataResponse = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/user-details`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      setUser(dataApi?.data);
    }
  };

      const [state, dispatch] = useReducer(cartReducer, {}, getInitialState);

      // Update `localStorage` whenever the cart state changes
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state));
      }, [state]);
  return (
    <AppContext.Provider
      value={{
        getUserDetails,
        user,
        setUser,
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
   console.log(context)
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export default ContextProvider;

