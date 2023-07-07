import { formatCurrency } from "../../utils/helpers";
// import Button from "../../ui/Button";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";


function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:justify-between sm:items-center" >
      <p className="mb-1 sm:mb-0">
        {name}
      </p>
      <div className="flex justify-between items-center sm:gap-8">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-4 justify-center items-center sm:gap-6">
          <UpdateItemQuantity id={pizzaId}/>
          <DeleteItem id={pizzaId}>Delete</DeleteItem>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
