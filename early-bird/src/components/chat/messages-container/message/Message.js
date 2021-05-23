import "./Message.scss";
import { GetUserId } from "../../../../services/AccountService";

function Message(props){
    console.log(props);
    let currentUserId = GetUserId();
    return(
        <div className="message" key={props.message.id}>
            {props.content ? 
            <div>
                {props.userId === currentUserId ? 
                    <div className="sent-message">{props.content}</div> : 
                    <div className="received-message">{props.content}</div>  
                }
            </div> : <div>No content</div>
            }
            {/* {props.userId === myId ? 
                <div className="sent-message">{props.content}</div> : 
                <div className="received-message">{props.content}</div>  
            } */}
        </div>
    );
}

export default Message;