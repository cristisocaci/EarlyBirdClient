import "./Message.scss";

function Message(props){

    return(
        <div className="message">
            {/* {props.userId === myId ? 
                <div className="sent-message">{props.content}</div> : 
                <div className="received-message">{props.content}</div>  
            } */}
        </div>
    );
}

export default Message;