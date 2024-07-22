import { createStore } from "redux";

const initialCartState = { isCart: false, cartData: [] };
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        isCart: !state.isCart,
      };
    case "ADD_CART":
      // console.log(action.payload, "::::::::::::::::");
      const cartData = [...state.cartData];
      const productIndex = cartData.findIndex(
        (item) => item.title === action.payload.title
      );
      if (productIndex === -1) {
        cartData.unshift({
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
          total: action.payload.price,
        });
      } else {
        cartData[productIndex].quantity += 1;
        cartData[productIndex].total =
          cartData[productIndex].quantity * cartData[productIndex].price;
      }

      return {
        ...state,
        cartData,
      };

    default:
      return state;
  }
};

const store = createStore(cartReducer);

export default store;
