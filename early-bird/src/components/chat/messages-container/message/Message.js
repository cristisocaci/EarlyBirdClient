import "./Message.scss";
import { GetUserId } from "../../../../services/AccountService";

function Message(props){
    let currentUserId = GetUserId();
    return(
        <div className="messages-grid" key={props.message.id}>
            {props.content ? 
            <div>
                {props.userId === currentUserId ? 
                    <div className="sent-message">{props.content}</div> : 
                    <div className="received-message">{props.content}</div>  
                }
            </div> : <div></div>
            }
        </div>
    );
}

export default Message;