import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

const DeleteItem = ({id}) => {
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteItem(id))
    }

    return (
        <Button type="secondary" handler={
            deleteHandler
        }>Delete</Button>
    )
}

export default DeleteItem