import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  function handleCart() {
    dispatch({ type: "TOGGLE" });
  }
  return (
    <button onClick={handleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartData.length}</span>
    </button>
  );
};

export default CartButton;
