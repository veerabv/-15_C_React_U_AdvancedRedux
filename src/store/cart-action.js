import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }), // this is changed because we will not use the isChanged key in database
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

      setTimeout(() => {
        dispatch(uiActions.ShowNotification(null));
      }, 1000);
    } catch (err) {
      dispatch(
        uiActions.ShowNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed",
        })
      );
      setTimeout(() => {
        dispatch(uiActions.ShowNotification(null));
      }, 1000);
    }
  };
}

export function fetchCartData() {
  return async (dispatch) => {
    const getCart = async () => {
      const response = await fetch(
        "https://react-dummy-8e08f-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Failed to Fetch the cart");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cart = await getCart();
      dispatch(
        cartActions.replaceCart({          // this is cahnged because we empty the cart , then the items key becomes empty in backend so we give default []  if the key is undefined
          items: cart.items || [],
          totalQuantity: cart.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.ShowNotification({
          status: "error",
          title: "Error",
          message: "Fetching Failed",
        })
      );
    }
  };
}
