import emoji from '../../illustrations/key-features/emoji.svg';
import message from '../../illustrations/key-features/message.svg';
import phone from '../../illustrations/key-features/phone.svg';
import waves from '../../illustrations/key-features/waves.svg';

import './KeyFeatures.scss';

function KeyFeatures() {
    return (
        <div className="center-key-features">
            <div id="kf-width">
                <h2 className="text-bold kf-title">Discover the key features</h2>
                <div className="row m-0">
                    <div className="col-md-6 col-12 kf-card">
                        <img src={emoji} alt=""></img>
                        <div>
                            <h4>Ease of Access</h4>
                            <p>All of your ongoing offers in one place. Keep your income streams diversified and well organised.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 kf-card">
                        <img src={waves} alt=""></img>
                        <div>
                            <h4>Variety of Job Offers</h4>
                            <p>Household chores? Easy computer-related tasks? Pet daycare? We have them all.</p>
                        </div>
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 col-12 kf-card">
                        <img src={message} alt=""></img>
                        <div>
                            <h4>Fast Communication</h4>
                            <p>Stay in touch with your publisher and settle your scores.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 kf-card">
                        <img src={phone} alt=""></img>
                        <div>
                            <h4>Mobile Friendly</h4>
                            <p>Have your offers on the go. Anywhere you are.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default KeyFeatures;