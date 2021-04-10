import hand from '../../illustrations/how-it-works/hand.svg';
import searchIcon from '../../illustrations/how-it-works/search-icon.svg';
import explosion from '../../illustrations/how-it-works/explosion.svg';
import emoji from '../../illustrations/how-it-works/emoji.svg';
import './HowItWorks.scss';

function HowItWorks(){
    return (
        <div className="center-how-it-works">
            <h2 id="how-it-works">How it works</h2>
            <div id="container" className="row">
                <div className="col-md-3 col-sm-6 hiw-elem">
                    <img src={hand}></img>
                    <h4>Set up your account</h4>
                    <p className="hiw-text">Create an account with your personal information</p>
                </div>
                <div className="col-md-3 col-sm-6 hiw-elem">
                    <img src={searchIcon}></img>
                    <h4>Find a good offer</h4>
                    <p className="hiw-text">Search for an offer you won’t be able to refuse</p>
                </div>
                <div className="col-md-3 col-sm-6 hiw-elem">
                    <img src={explosion}></img>
                    <h4>Do the tasks</h4>
                    <p className="hiw-text">Put in the work, but always enjoy your hustle</p>
                </div>
                <div className="col-md-3 col-sm-6 hiw-elem">
                    <img src={emoji}></img>
                    <h4>Profit</h4>
                    <p className="hiw-text">Collect your remuneration</p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;