const Navbar = ()=>{
    return(
        <div className="flex gap-40 shadow-lg bg-white">
            <h1 className="text-blue-500">To-do list</h1>
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="#">About us</a>
                <a href="#">Contact us</a>
            </nav>
        </div>
    )
}

export default Navbar;