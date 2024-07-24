import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    ShowNotification(state, action) {
      state.notification = action.payload
        ? {
            status: action.payload.status,
            title: action.payload.title,
            message: action.payload.message,
          }
        : null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
