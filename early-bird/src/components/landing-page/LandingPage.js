import './LandingPage.scss';
import logo from '../../illustrations/Saly-landing-page.svg';

function LandingPage() {
    function redirectTo(page){
        window.location.href = page;
    }
    return (
        <div id="center-lp">
        <div className="center-landing-page">
            <div id="right-text" className="mr-3 mr-sm-0">
                <h1 id="title" className="mb-4">Because the <span className="text-red">early birds</span> get the worm 💸</h1>
                <p id="description" className="mb-4">Too much time on your hands? Parents stressing you to get a job?
                Want to look fly but the sneakers are too expensive?
            You’ve come to the right place.</p>
                <div id="btn-landing">
                    <a id="lm" className="round bg-pink text-red py-2 px-3 text-bold btn-hover" href="#HowItWorks">Learn More</a>
                    <button className="round bg-red text-white py-2 px-2 btn-hover"  onClick={() => redirectTo('/register')}>Start your hustle</button>
                </div>
            </div>
            <div id="logo-div" className="d-none d-md-flex justify-content-center align-items-center">
                <img className="logo" src={logo} alt=""></img>
            </div>
        </div>
        </div>
    );
}

export default LandingPage