import "./SendMessage.scss";
import React, { useState } from 'react';
import {CreateMessage} from "../../../../services/ChatService"
import {GetUserId} from "../../../../services/AccountService"


function SendMessage(props){
    const [message, setMessage] = useState('');

    const onSubmit = () => {
        const isMessageProvided = message && message !== '';

        if (isMessageProvided) {
            let messAux = {
                senderId: GetUserId(),
                content: message,
            }
            props.setMessages([messAux,...props.messages]);
            CreateMessage(props.conversationId, props.user, message);
        } 
        setMessage('');
    }

    const onMessageUpdate = (e) => {
        if(e.target.value.length < 1000)
            setMessage(e.target.value);
    }

    function enterSubmit(event) {
        if (event.code === "Enter" || event.code === "NumpadEnter")
          onSubmit();
      }

    return(
        <div className="send-message">
            <input 
                type="text"
                className="message-input"
                placeholder="Write a new message..."
                value={message}
                onChange={onMessageUpdate}
                onKeyPress={enterSubmit}
            />
            <div className="send-message-input">
                <div className="send-message-button" onClick={onSubmit}/>
            </div>
        </div>
    );
}

export default SendMessage;