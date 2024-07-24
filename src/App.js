import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let initial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.ShowNotification({
          status: "pending",
          title: "Sending",
          message: "sending cart data",
        })
      );
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

      // const data = await response.json();
      dispatch(
        uiActions.ShowNotification({
          status: "success",
          title: "Success..!",
          message: "sending cart data Successfully",
        })
      );
    };

    if (initial) {
      initial = false; //this is used to skip the api call for the first time
      return;
    }
    sendCartData().catch((err) => {
      dispatch(
        uiActions.ShowNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
