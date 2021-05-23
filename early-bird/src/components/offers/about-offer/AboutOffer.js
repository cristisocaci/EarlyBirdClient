import "./AboutOffer.scss";
import {useHistory} from 'react-router-dom';
import {CreateConversation} from "../../../services/ChatService"
import { GetUserId } from "../../../services/AccountService";

function AboutOffer(props){

    const history = useHistory();
    let userId = GetUserId();

    function redirectTo(page){
        history.push(page);
    }

    function renderCategories(){
        if(props.categories==null) return;
        return props.categories.map((x,index) =>
            <span key={index} className="bg-red text-white category-pill">{x.name}</span>
        )
    }

    function renderLocation(){
        if(props.location==null) return;
        return <p>{props.location.streetName} {props.location.streetNumber}, {props.location.cityName}</p>

    }

    function contactPublisher(){
        let publisherToBeContacted;

        CreateConversation(props.publisher.id).then(result => {
            publisherToBeContacted = userId === result.firstId ? result.secondId : result.firstId
            let publisherToBeContactedName = props.publisher.firstname + " " + props.publisher.lastname;

            let conversation = {
                id: result.id,
                newMessage: false,
                receiverId: publisherToBeContacted,
                name: publisherToBeContactedName
              };
              
            sessionStorage.setItem("conversationRedirect", JSON.stringify(conversation))
            
            redirectTo('/chat/true')
        })
    }

    return (
        <div className="about-offer">
            <div className="ao-upper">
                <div className="ao-title-and-cost">
                    <div>
                        <h2 className="text-bold">{props.title}</h2>
                        <div className="ao-categories">
                            {renderCategories()}
                        </div>
                    </div>
                    <div className="ao-center-cost">
                        <div className="ao-cost">
                            <h2 className="text-red m-0">{props.cost}$</h2>
                        </div>
                    </div>
                </div>
                <h4 className="text-bold">Description of the task:</h4>
                <p>{props.description}</p>
                
            </div>
            <div>
                <div className="ao-lower">
                    <div>
                        <h4 className="text-bold">Prerequisites:</h4>
                        <p>{props.prerequisites}</p>
                    </div>
                    <div>
                        <h4 className="text-bold">Location:</h4>
                        {renderLocation()}
                    </div>
                </div>
                <div className="offer-buttons">
                    {function(){
                            return props.role === "publisher"
                            ? <button className="bg-red round btn-hover text-white px-4 py-2">Edit this offer</button>
                            : <div className="worker-offer-btns">
                                <button className="bg-red round btn-hover text-white px-3 py-2 text-bold" onClick={contactPublisher}>Contact publisher</button>
                            </div>
                        }()}
                </div>
            </div>
        </div>
    );
}

export default AboutOffer;