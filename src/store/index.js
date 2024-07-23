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
      // console.log(state.cartData,"???????");
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

    case "INC_ITEM":
      // console.log(state.cartData,"??36");
      const items = [...state.cartData];

      const updatedItems = items.map((item) => {
        if (item.title === action.payload) {
          const updateItem = {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity + 1) * item.price,
          };
          return updateItem;
        } else {
          return { ...item };
        }
      });
      return {
        ...state,
        cartData: updatedItems,
      };

    case "DEC_ITEM":
      const cartDatas = [...state.cartData];
      const updateCart = cartDatas.map((item) => {
     
        if (item.title === action.payload) {
          const updateItem = {
            ...item,
            quantity: item.quantity - 1,
            total: (item.quantity - 1) * item.price,
          };
          return updateItem;
        } else {
          return { ...item };
        }
      }).filter(item => item.quantity > 0)

      return {
        ...state,
        cartData: updateCart,
      };

    default:
      return state;
  }
};

const store = createStore(cartReducer);

export default store;
