import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price } = props.item;

  function handleInc(title){
    // console.log("Tri");
    dispatch({type:"INC_ITEM" , payload : title})
  }

  function handleDec(title){
    dispatch({type:"DEC_ITEM" , payload : title})

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
