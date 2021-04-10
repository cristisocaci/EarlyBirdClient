import './Navbar.scss';

function Navbar(){
    return(
        <div id="navbar">
            <div id="center-nav" className="row my-3">
                <div id="links-left" className="col-md-4">
                    <a className="text-bold text-black m-0 mr-4 ">About</a>
                    <a className="text-bold text-black m-0">Contact</a>
                </div>
                <h3 id="title-center" className="col-md-4 text-bold">Early Bird</h3>
                <div id="btn-right" className="col-md-4">
                    <button className="round bg-pink text-red text-bold px-4 py-2">Login</button>
                    <button className="round bg-red text-white px-4 py-2 ml-3">Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;