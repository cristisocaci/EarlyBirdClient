import "./CallToAction.scss";
import check from "../../illustrations/check.svg";

function CallToAction(){
    return(
        <div className="center-call-to-action bg-red">
            <h2 className="text-white">Earn more with your time</h2>
            <button className="bg-white text-red text-bold round cta-join-btn">Join now</button>
            <div className="checks">
                <div className="check">
                    <img src={check} className="cta-icon"></img>
                    <p className="text-white text-ligther cta-text">User friendly UI</p>
                </div>
                <div className="check">
                    <img src={check} className="cta-icon"></img>
                    <p className="text-white text-ligther cta-text">Access to numerous offers</p>
                </div>
                <div className="check">
                    <img src={check} className="cta-icon"></img>
                    <p className="text-white text-ligther cta-text">Safe, trusted job offers</p>
                </div>
            </div>
        </div>
    );
}

export default CallToAction;