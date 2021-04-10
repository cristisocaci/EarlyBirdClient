import hand from '../../illustrations/how-it-works/hand.svg';
import searchIcon from '../../illustrations/how-it-works/search-icon.svg';
import explosion from '../../illustrations/how-it-works/explosion.svg';
import emoji from '../../illustrations/how-it-works/emoji.svg';

function HowItWorks(){
    return (
        <div class="center">
            <h2>How it works</h2>
            <div class="grid">
                <div class="grid-item">
                    <img src={hand}></img>
                    <h4>Set up your account</h4>
                    <p>Create an account with your personal information</p>
                </div>
                <div class="grid-item">
                    <img src={searchIcon}></img>
                    <h4>Find a good offer</h4>
                    <p>Search for an offer you won’t be able to refuse</p>
                </div>
                <div class="grid-item">
                    <img src={explosion}></img>
                    <h4>Do the tasks</h4>
                    <p>Put in the work, but always enjoy your hustle</p>
                </div>
                <div class="grid-item">
                    <img src={emoji}></img>
                    <h4>Profit</h4>
                    <p>Collect your remuneration</p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;