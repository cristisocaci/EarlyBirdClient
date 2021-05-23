import "./MessagesContainer.scss";
import Receiver from "./receiver/Receiver.js";
import Message from "./message/Message.js";
import SendMessage from "./send-message/SendMessage.js";
import { useEffect, useState, useRef  } from "react";
import { GetMessages } from "../../../services/ChatService";

function MessagesContainer(props) {
  const divRef = useRef(null)

  useEffect(() => {


    const scrollToBottom= async ()=>{
      document.getElementById('scroll-div').scrollIntoView();
    }
    scrollToBottom();
        // divRef.current.scrollIntoView(
    //   {
    //     behavior: 'smooth',
    //     block: 'end',
    //     inline: 'nearest'
    //   })
    // var div = document.getElementById('scroll-div');
    // div.scrollTop = div.scrollHeight - div.clientHeight;
    //div.scrollTop = div.lastChild.offsetTop
      getMessages();
  }, [props.conversation.id]);

  function getMessages(){
    
    GetMessages(props.conversation.id).then((result) => {
        props.setMessages(result)
    });
  }

  return (

    <div id="ceva" className="messages-container">
      <Receiver className="receiver" receiverName={props.conversation.name} />

      <div id="scroll-div" className="messages-view">
        {props.messages.length !== 0
          ? props.messages.slice(0).reverse().map((message, index) => (
              <Message
                message={message}
                content={message.content}
                userId={message.senderId}
                myId={props.currentUserId}
                key={index}
              />
            ))
          : "No content"}
      </div>

      <SendMessage
        className="send-message"
        user={props.conversation.receiverId}
        conversationId={props.conversation.id}
      />
    </div>
  );
}

export default MessagesContainer;
