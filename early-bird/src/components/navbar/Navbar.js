import './Navbar.scss';

function Navbar(){
    return(
        <div id="navbar">
            <div id="center-nav" className="row my-3">
                <div id="links-left" className="col-md-4 col-0">
                    <a className="text-bold text-black m-0 mr-4 ">About</a>
                    <a className="text-bold text-black m-0">Contact</a>
                </div>
                <h3 id="title-center" className="col-md-4 col-6 text-bold">Early Bird</h3>
                <div id="btn-right" className="col-md-4 col-6">
                    <button className="round bg-pink text-red text-bold text-small px-4 py-1">Login</button>
                    <button id="signup" className="round bg-red text-white text-small px-4 py-1">Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;