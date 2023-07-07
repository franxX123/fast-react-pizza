import LinkButton from "../../ui/LinkButton";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "../cart/CartItem"
import { useDispatch, useSelector } from "react-redux";
import { getCart, clear } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const navigate = useNavigate()
  const username = useSelector(state => state.user.userName);
  const cart = useSelector(getCart)
  const dispatchClear = useDispatch()

  if (cart.length === 0){
    return <EmptyCart />
  }

  return (
    <div className="py-4 px-3">
      <LinkButton onClick={() => navigate("/menu")}>&larr; Back to Menu</LinkButton>

      <h2 className="mt-8 font-semibold text-lg">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b border-stone mt-3 ">
        {
          cart.map((item)=>{
            return <CartItem  key={item.pizzaId} item={item} />
          })
        }
      </ul>

      <div className="mt-8 space-x-4">
        <Button type="primary" to="/order/new">Order pizzas</Button>
        <Button type="ternary" handler={() => 
          dispatchClear(clear())
        }>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
