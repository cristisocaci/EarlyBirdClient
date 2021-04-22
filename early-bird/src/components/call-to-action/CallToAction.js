import "./CallToAction.scss";
import check from "../../illustrations/check.svg";

function CallToAction(){
    function redirectTo(page){
        window.location.href = page;
    }
    return(
        <div className="center-call-to-action bg-red">
            <h2 className="text-white">Earn more with your time</h2>
            <button className="bg-white text-red text-bold round cta-join-btn btn-hover-inset" onClick={() => redirectTo('/register')}>Join now</button>
            <div className="checks">
                <div className="check">
                    <img src={check} className="cta-icon" alt=""></img>
                    <p className="text-white text-ligther cta-text">User friendly UI</p>
                </div>
                <div className="check">
                    <img src={check} className="cta-icon" alt=""></img>
                    <p className="text-white text-ligther cta-text">Access to numerous offers</p>
                </div>
                <div className="check">
                    <img src={check} className="cta-icon" alt=""></img>
                    <p className="text-white text-ligther cta-text">Safe, trusted job offers</p>
                </div>
            </div>
        </div>
    );
}

export default CallToAction;