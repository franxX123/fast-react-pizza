import { useNavigate } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  const navigate = useNavigate()

  return (
    <div className="mx-4 mt-3">
      <LinkButton onClick={() => navigate("/menu")}>&larr; Back to menu</LinkButton>

      <p className="mt-5 font-semibold">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
