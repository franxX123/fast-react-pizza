import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isCartEmpty = useSelector(state => state.cart.cart.length === 0)

  return (
    <div className="layout h-screen grid grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      {/* NOTE: this div is a workaround for applying max-w-3xl. Because without it "main" would be a grid item and 
          the max-w property will not work.
      */}
      <div>
        <main className="max-w-3xl mx-auto">
            <Outlet/>
        </main>
      </div>

      { isCartEmpty ? "" : <CartOverview />}
    </div>
  );
}

export default AppLayout;
