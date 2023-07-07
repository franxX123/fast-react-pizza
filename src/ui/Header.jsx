import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "./Username";

function Header() {
  return (
    <header className="bg-yellow-300 uppercase px-4 py-3 border border-stone-300 flex justify-between items-center">
      <div className="flex gap-5 justify-between items-center w-full sm:w-fit">
        <Link to="/" className="tracking-wider">Fast React Pizza Co.</Link>
        <SearchOrder />
      </div>

      <Username />
    </header>
  );
}

export default Header;
