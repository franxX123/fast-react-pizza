import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  // NOTE: returns a function to get back to a particular page.
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    // NOTE: navigate allows us to change the route
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className="px-4 py-2 rounded-full text-sm bg-yellow-100 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1 w-42 sm:w-52 focus:ring-opacity-50 focus:w-52 transition duration-250"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
