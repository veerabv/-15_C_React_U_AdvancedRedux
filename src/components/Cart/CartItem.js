import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price } = props.item;

  function handleInc(title){
    // console.log("Tri");
    dispatch(cartActions.incItem(title))
  }

  function handleDec(title){
    dispatch(cartActions.decItem(title))

  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick = {() => handleDec(title)}>-</button>
          <button onClick = {() => handleInc(title)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
