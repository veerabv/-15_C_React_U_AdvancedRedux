import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartData = useSelector((state) => state.cartData);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartData.length > 0 &&
          cartData.map((item) => (
            <CartItem
              key={item.title}
              // item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
              item={item}
            />
          ))}

        {cartData.length === 0 && <p>No Items in the Cart ....</p>}
      </ul>
    </Card>
  );
};

export default Cart;
