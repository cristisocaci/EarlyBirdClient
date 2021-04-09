import './LandingPage.scss';
import logo from '../../illustrations/Saly-landing-page.svg';

function LandingPage() {
    return (
        <div className="row center horizontal">
            <div className="col-xl-9 col-lg-8 col-sm-7">
                <h1 id="title">Because the <span className="red">early birds</span> get the worm 💸</h1>
                <p id="description">Too much time on your hands? Parents stressing you to get a job?
                Want to look fly but the sneakers are too expensive?
            You’ve come to the right place.</p>
                <button>Learn More</button>
                <button>Start your hustle</button>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-5">
                <img className="logo" src={logo}></img>
            </div>
        </div>
    );
}

export default LandingPage