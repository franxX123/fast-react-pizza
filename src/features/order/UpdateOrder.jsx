import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// IMPORTANT: When an update occurs Order component will be revalidated
// since data has been changed
function UpdateOrder() {

    const fetcher = useFetcher();

    // NOTE: must include the request method
    return (<fetcher.Form method="PATCH" className="text-right">
        <Button type="primary">Make Priority</Button>
    </fetcher.Form>);
}

// NOTE: params contain info about the url (i.e orderId)
export const action = async ({request, params}) => {
    const data = { priority: true};
    await updateOrder(params.orderId, data);
    return null;
}

export default UpdateOrder;