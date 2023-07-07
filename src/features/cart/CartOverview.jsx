import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity } from "./cartSlice";
import {getTotalCartPrice} from "./cartSlice"

function CartOverview() {

  const totalQuantity = useSelector(getTotalCartQuantity)
  const totalPrice = useSelector(getTotalCartPrice)
  // console.log(totalPrice)

  return (
    // NOTE: when styling you want to match the background but
    // a lot lighter
    <div className="bg-stone-800 text-stone-100 uppercase px-4 py-3 sm:px-6 flex justify-between">
      {/* NOTE: space-x-someValue allows us to define some space between elements
        within the container. 
      */}
      <p className="text-stone-200 space-x-4">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
