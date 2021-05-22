import "./SendMessage.scss";
import React, { useState } from 'react';


function SendMessage(props){
    const [message, setMessage] = useState('');
    const user = props.user;

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
        } 
        else {
            alert('Please insert a message.');
        }
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return(
        <div className="send-message">
            <input 
                type="text"
                className="message-input"
                placeholder="Write a new message..."
                onChange={onMessageUpdate}
            />
            <div className="send-message-input">
                <div className="send-message-button" onClick={onSubmit}/>
            </div>
        </div>
    );
}

export default SendMessage;