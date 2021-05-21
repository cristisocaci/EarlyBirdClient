import "./Footer.scss";
import {useHistory} from 'react-router-dom';

function Footer(){

    const history = useHistory();

    function redirectTo(page){
        history.push(page);
    }

    return (
        <div className="bg-black text-white m-0 footer">
            <div className="f-container row">
                <h2 className="col-md-4 f-title">Early Bird</h2>
                <p className="col-md-4 f-text">© 2021 Early Bird Ltd. All rights reserved</p>
                <div className="col-md-4 f-aboutus">
                    <a className="text-bold text-white m-0 mr-4 " key="1" onClick={(e) => {
                        e.preventDefault()
                        redirectTo('/about')
                    }} href="/">About us
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;