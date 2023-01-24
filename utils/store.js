import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("dark-mode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return {
        ...state,
        darkMode: true
      }
    case "DARK_MODE_OFF":
      return {
        ...state,
        darkMode: false
      }
    case "ADD_CART_ITEM": {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(item => item._id === newItem._id);
      const cartItems = existingItem ?
        state.cart.cartItems.map(item =>
          item.name === existingItem.name ? newItem : item
        ) : [...state.cart.cartItems, newItem]

      Cookies.set("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart, cartItems
        }
      }
    }
    default:
      return state
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {children}
    </Store.Provider>
  )
}