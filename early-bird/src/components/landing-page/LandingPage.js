import './LandingPage.scss';
import logo from '../../illustrations/Saly-landing-page.svg';

function LandingPage() {
    return (
        <div id="center">
        <div className="row center-landing-page">
            <div className="col-xl-9 col-lg-8 col-md-7  mr-3 mr-sm-0">
                <h1 id="title" className="mb-4">Because the <span className="text-red">early birds</span> get the worm 💸</h1>
                <p id="description" className="mb-4">Too much time on your hands? Parents stressing you to get a job?
                Want to look fly but the sneakers are too expensive?
            You’ve come to the right place.</p>
                <button className="round mr-4 bg-pink text-red py-2 px-3 text-bold">Learn More</button>
                <button className="round bg-red text-white py-2 px-2">Start your hustle</button>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-5 d-none d-md-flex justify-content-center align-items-center">
                <img className="logo" src={logo}></img>
            </div>
        </div>
        </div>
    );
}

export default LandingPage