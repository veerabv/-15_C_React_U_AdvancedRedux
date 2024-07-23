
import { configureStore,createSlice } from "@reduxjs/toolkit";

const initialCartState = { isCart: false, cartData: [] };

const counterSlice = createSlice({name:"cart",
  initialState:initialCartState,
  reducers : {
    toggle(state){
      state.isCart = !state.isCart;

    },
    addCart(state,action){
      const cartData = state.cartData;
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

    },
    incItem(state , action){
      state.cartData = state.cartData.map((item) => {
        if (item.title === action.payload) {
          const updateItem = {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity + 1) * item.price,
          };
          return updateItem;
        } else {
          return item;
        }
      });

    },
    decItem(state , action){
      state.cartData = state.cartData.map((item) => {
     
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

    }

  }
})
// 


const store = configureStore({reducer :counterSlice.reducer })

export const cartActions = counterSlice.actions;
export default store;
