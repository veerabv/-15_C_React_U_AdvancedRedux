import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store";

const CartButton = (props) => {
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  function handleCart() {
    dispatch(cartActions.toggle());
  }
  return (
    <button onClick={handleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartData.length}</span>
      {/* <span className={classes.badge}>{0}</span> */}
    </button>
  );
};

export default CartButton;
