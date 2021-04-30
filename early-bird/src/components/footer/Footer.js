import "./Footer.scss";
import insta from "../../illustrations/footer/insta.svg";
import twitter from "../../illustrations/footer/twitter.svg";
import web from "../../illustrations/footer/web.svg";
import yt from "../../illustrations/footer/yt.svg";

function Footer(){
    return (
        <div className="bg-black text-white m-0 footer">
            <div className="f-container row">
            <h2 className="col-md-4 f-title">Early Bird</h2>
            <p className="col-md-4 f-text">© 2021 Early Bird Ltd. All rights reserved</p>
            <div className="f-icons col-md-4">
                <img src={insta} className="f-icon" alt=""></img>
                <img src={twitter} className="f-icon" alt=""></img>
                <img src={web} className="f-icon" alt=""></img>
                <img src={yt} className="f-icon" alt=""></img>
            </div>
            </div>
        </div>
    );
}

export default Footer;