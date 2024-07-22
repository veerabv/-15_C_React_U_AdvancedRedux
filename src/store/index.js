import { createStore } from "redux";

const initialCartState = { isCart: false , cartCount : 0};
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        isCart: !state.isCart,
      }
      case "ADD_CART":
        return {
            ...state,
            cartCount : state.cartCount + 1
        }

    default:
      return state;
  }
};

const store = createStore(cartReducer);

export default store;
