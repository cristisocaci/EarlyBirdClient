import "./SendMessage.scss";
import React, { useState } from 'react';
import {CreateMessage} from "../../../../services/ChatService"


function SendMessage(props){
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isMessageProvided = message && message !== '';

        if (isMessageProvided) {
            CreateMessage(props.conversationId, props.user, message);
        } 
        else {
            alert('Please insert a message.');
        }
        setMessage('');
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
                value={message}
                onChange={onMessageUpdate}
            />
            <div className="send-message-input">
                <div className="send-message-button" onClick={onSubmit}/>
            </div>
        </div>
    );
}

export default SendMessage;