import { useSelector } from "react-redux";


function Username() {
    const username = useSelector(state => state.user.userName);

    return ( <p className="text-sm font-semibold hidden sm:block">
        {username}
    </p> );
}

export default Username;