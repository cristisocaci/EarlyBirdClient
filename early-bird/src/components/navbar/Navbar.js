import './Navbar.scss';
import {useHistory} from 'react-router-dom';
import {IsUserLoggedIn, GetUserId} from '../../services/AccountService';

function Navbar(props) {

    const history = useHistory();

    function redirectTo(page){
        history.push(page);
    }

    function logout(){
        localStorage.removeItem("jwt");
        redirectTo('/');
    }

    function getContentLeft() {
        let content = [];
        content.push(<a className="text-bold text-black m-0 mr-4 " key="1" onClick={(e) => {
            e.preventDefault()
            redirectTo('/about')
        }} href="/">About us</a>);
        return (
            <div id="links-left" className="col-md-4 col-0">
                {content}
            </div>
        )
    }

    function getContentRight() {
        let content = [];
        if (IsUserLoggedIn()) {
            content.push(<button className="round bg-pink text-red text-bold text-small px-4 py-1 btn-hover" key="1" onClick={() => redirectTo('/login')}>Login</button>);
            content.push(<button id="signup" className="round bg-red text-white text-small px-3 py-1 btn-hover" key="2" onClick={() => redirectTo('/register')}>Sign up</button>);
        }
        else {
            content.push(<div className="round navbar-messages-btn" onClick={() => redirectTo('/chat')}>
            </div>);
            content.push(<div className="round navbar-profile-btn" onClick={() => redirectTo(`/users/${GetUserId()}`)}>
            </div>)
            content.push(<button id="logout" className="round bg-red text-white text-small px-4 py-1 btn-hover" key="1" onClick={() => logout()}>Log out</button>)
        }
        return (
            <div id="btn-right" className="col-md-4 col-6">
                {content}
            </div>
        )
    }
    

    return (
        <div id="navbar">
            <div id="center-nav" className="row my-3">
                {getContentLeft()}
                <h3 id="title-center" className="col-md-4 col-6 text-bold" onClick={() => redirectTo('/home')}>Early Bird</h3>
                {getContentRight()}
            </div>
        </div>
    );
}

export default Navbar;
