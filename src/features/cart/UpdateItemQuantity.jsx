import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ id }) {
    // NOTE: we assume the pizza corresponding to id exists in the cart

    const dispatchIncrease = useDispatch()
    const dispatchDecrease = useDispatch()
    const {quantity} = useSelector(state => state.cart.cart.find((pizza) => {
        return pizza.pizzaId === id
    }))

    return ( <div className="flex gap-1.5 items-center md:gap-3">
        <Button handler={() => {
            dispatchDecrease(decreaseItemQuantity(id))
        }} type="round">-</Button>
        <p>{quantity}&times;</p>
        <Button handler={() => {
            dispatchIncrease(increaseItemQuantity(id))
        }} type="round">+</Button>
    </div> );
}

export default UpdateItemQuantity;