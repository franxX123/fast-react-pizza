// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import OrderItem from "./OrderItem"
import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData, useFetcher } from "react-router-dom";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  console.log(order)

  // NOTE: fetcher uses the data loaded from the menu page
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu")
    }
  }, [fetcher])

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id}</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-2 uppercase font-semibold text-red-50 tracking-wide">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-2 uppercase font-semibold text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      {/* NOTE: flex-wrap moves items that don't have enough space down to the next line. */}
      <div className="flex justify-between items-center flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-stone-500 text-xs">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-y"> 
        {
          cart.map((item) => {
            return <OrderItem className="p-2" item={item} key={item.pizzaId} isLoadingIngredients={fetcher.state === "loading"} ingredients={
              fetcher?.data?.find((menuItem) => item.pizzaId === menuItem.id)?.ingredients
            } />
          })
        }
      </ul>

      <div className="space-y-2 bg-stone-200 px-5 py-6">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-sm font-semibold text-stone-600">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      <UpdateOrder />
    </div>
  );
}

// NOTE: loader also gets a data object with "params" as an attribute
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
