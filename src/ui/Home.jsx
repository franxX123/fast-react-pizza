import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser"
import Button from "../ui/Button"

function Home() {

  // NOTE: useSelector to read from an action slice from the redux store
  const username = useSelector(state => state.user.userName);

  return (
    <div className="mt-10 mb-10 text-center">
      <h1 className="mb-8 text-base md:text-2xl/6 font-semibold space-y-3">
        <div>The best pizza.</div>
        <div className="text-yellow-500">Straight out of the oven, straight to you.</div>
      </h1>

      {!username ? <CreateUser /> : <Button type="primary" to="/menu">Continue Ordering, {username}</Button>}
    </div>
  );
}

export default Home;
