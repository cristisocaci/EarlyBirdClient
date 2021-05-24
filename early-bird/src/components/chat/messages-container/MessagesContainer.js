import "./MessagesContainer.scss";
import Receiver from "./receiver/Receiver.js";
import Message from "./message/Message.js";
import SendMessage from "./send-message/SendMessage.js";
import { useEffect} from "react";
import { GetMessages } from "../../../services/ChatService";
import ScrollToBottom from "react-scroll-to-bottom";

function MessagesContainer(props) {

  useEffect(() => {
    GetMessages(props.conversation.id).then((result) => {
      props.setMessages(result)
    });
  }, [props]);

  return (

    <div id="ceva" className="messages-container">
      <Receiver className="receiver" 
        receiverName={props.conversation.name} 
        receiverId={props.conversation.receiverId}
      />

      <ScrollToBottom  className="messages-view">
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
          : <div></div>}
      </ScrollToBottom>
      <SendMessage
        className="send-message"
        messages ={props.messages}
        setMessages ={props.setMessages}
        user={props.conversation.receiverId}
        conversationId={props.conversation.id}
      />
    </div>
  );
}

export default MessagesContainer;
