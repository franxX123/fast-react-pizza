import { useNavigate } from "react-router-dom";

// eslint-disable-next-line
function Button({type, children, disabled=false, to, handler = null }) {
    const navigate = useNavigate()

    const base = "px-4 bg-yellow-300 text-stone-800 tracking-wide uppercase font-semibold rounded-full hover:text-stone-600 hover:bg-yellow-200 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-offset-2"

    const buttonTypes = {
        primary: base + " py-3 sm:px-6 sm:py-4 text-sm",
        secondary: base + " py-2 md:px-5 md:py-2.5 text-xs",
        round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
        ternary: "inline-block rounded-full text-sm border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disable:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5"
    }

    // NOTE: A button can only be used to change pages or do some none navigation related functionality.
    let btnHandler;
    
    if (to) {
        btnHandler = () => {
            navigate(to)
        }
    }

    if (handler) {
        btnHandler = handler
    }

    return ( <button onClick={btnHandler} 
        disabled={disabled} className={buttonTypes[type]}>
        {children}
    </button> );
}

export default Button;