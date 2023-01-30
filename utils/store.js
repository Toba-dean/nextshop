import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("dark-mode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
    shippingAddress: Cookies.get("shipping_address") ? JSON.parse(Cookies.get("shipping_address")) : {},
    paymentMethod: Cookies.get("paymentMethod") ? Cookies.get("paymentMethod") : null
  },
  currentUser: Cookies.get("currentUser") ? JSON.parse(Cookies.get("currentUser")) : null
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
    case "REMOVE_CART_ITEM": {
      const cartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id);
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart, cartItems
        }
      }
    }
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload
      }
    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: null
        }
      }
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload }
      }
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload }
      }
    case "CLEAR_CART":
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] }
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