import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export function sendCartData(cart) {
  return async (dispatch) => {
    // in this the return function called by the redux for us
    dispatch(
      uiActions.ShowNotification({
        status: "pending",
        title: "Sending",
        message: "sending cart data",
      })
    );
    const sendReq = async () => {
      const response = await fetch(
        "https://react-dummy-8e08f-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send the data ");
      }
    };
    try {
      await sendReq();
      dispatch(
        uiActions.ShowNotification({
          status: "success",
          title: "Success..!",
          message: "sending cart data Successfully",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.ShowNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed",
        })
      );
    }
  };
}

export const cartActions = cartSlice.actions;

export default cartSlice;
