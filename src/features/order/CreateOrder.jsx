// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clear, getTotalCartPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart"
import store from "../../../store"
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  // NOTE: getCart must be invoked/called since we need an action object. 
  // We get it via invoking an action creator function.
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // NOTE: useActionData is mostly used for getting the errors
  const formErrors = useActionData();
  const {username, status: addressStatus, position, address, error: errorAddress } = useSelector(state => state.user)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0
  const totalPrice = totalCartPrice + priorityPrice
  const isAddressLoading = addressStatus === "loading";
  const dispatch = useDispatch()

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-xl mb-10">{"Ready to order? Let's go!"}</h2>

      {/* NOTE: this form can make http requests */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          {/* NOTE: don't use value since that would prevent us from using username */}
          <input defaultValue={username} className="input grow" placeholder="e.g Joe Mama" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" placeholder="e.g 416-4624-8102" type="tel" name="phone" required />
            {formErrors?.phone ? <p className="mt-2 text-xs text-red-700 bg-red-100 px-2 py-1 rounded-md">{formErrors.phone}</p> : ""}
          </div>

          {/* NOTE: optional chaining to return null when the attribute phone does not
          exist */}
          
        </div>

        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          {!position?.latitude && !position?.longitude && <span  className="absolute right-[3px] z-50 top-[34.5px] md:right-[5px] md:top-[5px]">
            <Button type="secondary" handler={(e) => {
              e.preventDefault()
              dispatch(fetchAddress())
              console.log(addressStatus)
            }}>Get Position</Button>
              
          </span>}
          <div className="grow">
            <input defaultValue={address} disabled={isAddressLoading} placeholder="e.g Vancouver, Ontario" className="input w-full" type="text" name="address" required />
            {addressStatus === "error" && <p className="mt-2 text-xs text-red-700 bg-red-100 px-2 py-1 rounded-md">{errorAddress}</p>}
          </div>
        </div>

        <div className="flex items-center gap-5 mb-10">
          <input
            disabled={isAddressLoading}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div >
          {/* NOTE: this hidden field will include the cart data */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ""} />
          <Button type="primary" disabled={isSubmitting} className="bg-yellow-300 px-4 py-3 text-stone-800 tracking-wide uppercase font-semibold rounded-full hover:text-stone-600 hover:bg-yellow-200 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-offset-2">{`order now for ${formatCurrency(totalPrice)}`}</Button>
          <p>{isSubmitting ? "Submitting Order..." : ""}</p>
        </div>
      </Form>
    </div>
  );
}

// IMPORTANT: Difference between action and loader is the timing
// of when they are invoked. A loader always loads data while a component is rendering
// whereas the action can be invoked whenever. This is especially useful when
// sending post requests using Forms.

// NOTE: this action function will be called by the CreateOrder component
// via the Form component provided by react-router
export async function action({ request }) {
  // IMPORTANT: next two lines lets us transform the formData
  // and see it in a more human friendly manner.
  const formData = await request.formData();
  const formObj = Object.fromEntries(formData);

  // NOTE: The cart and priority are strings, thus we modify them
  const order = {
    ...formObj,
    cart: JSON.parse(formObj.cart),
    priority: formObj.priority === "true",
  };

  // console.log(order)

  let errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us a correct phone number. We might need to contact you.";
  }

  // NOTE: This can also be done some other way like
  // having a return for each error condition. But
  // that would lead to alot of code duplication
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  // NOTE: clear cart. Do NOT OVERUSE causes slow downs
  store.dispatch(clear())

  // NOTE: if everything is correct we will
  // redirect will change the route and send us to the
  // orders page
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
