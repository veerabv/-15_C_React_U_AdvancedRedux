import classes from './CartButton.module.css';
import { useDispatch,useSelector } from 'react-redux';


const CartButton = (props) => {
  const cartCount = useSelector(state => state.cartCount)
  const dispatch = useDispatch();
  function handleCart(){
    dispatch({type:"TOGGLE"})
  }
  return (
    <button onClick={handleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartCount}</span>
    </button>
  );
};

export default CartButton;
