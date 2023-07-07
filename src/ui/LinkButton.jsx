
function LinkButton({onClick, children}) {

    return (<button
        className={`text-blue-400 hover:text-blue-600 hover:underline tracking-wide uppercase font-semibold rounded-full transition-all duration-300`} onClick={onClick}>
        {children}
    </button>);
}

export default LinkButton;