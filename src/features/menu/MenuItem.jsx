import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button"
import { useDispatch, useSelector } from "react-redux";
import { addItem, checkPizzaIdInCart } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const isPizzaInCart = useSelector(checkPizzaIdInCart(id))

  const dispatchCartItem = useDispatch();

  const addItemHandler = () => {

    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    }
    
    dispatchCartItem(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2" key={id}>
      <img className={`w-24 ${soldOut ? "grayscale opacity-70" : ""}`} src={imageUrl} alt={name} />
      {/* NOTE: flex-grow is applied at the parent level and the items inside will stretch as much as necessary */}
      <div className="flex flex-col flex-grow">
        <p className="font-semibold">{name}</p>
        <p className="capitalize text-sm">{ingredients.join(", ")}</p>

        <div className={`mt-auto text-sm flex flex-grow justify-between items-center`}>
          {!soldOut ? <p className="pt-0.5">{formatCurrency(unitPrice)}</p> : <p className="pt-0.5 font-semibold text-stone-500">Sold out</p>}

          {soldOut ? "" : 
          <> 
            
            {isPizzaInCart ? 
              <div className="flex gap-3">
                <UpdateItemQuantity id={id} />
                <DeleteItem id={id} />
              </div>
            : <Button handler={addItemHandler} type="secondary" disabled={false}>add to cart</Button>}
          </>
          }
        
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
