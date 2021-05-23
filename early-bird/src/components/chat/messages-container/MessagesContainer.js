import "./MessagesContainer.scss";
import Receiver from "./receiver/Receiver.js";
import Message from "./message/Message.js";
import SendMessage from "./send-message/SendMessage.js";
import { useEffect, useState } from "react";
import { GetMessages } from "../../../services/ChatService";

function MessagesContainer(props) {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMessages(1);
  }, [props.conversation.id]);


  useEffect(() => {
    if (props.connection) {
          props.connection.on("ReceiveMessage", (message) => {
              let messAux = [message,...messages];
              setMessages(messAux);
          });
    }
  }, [props.connection]);


  function getMessages(page){
    let query = {
      pageSize: 10,
      pageNumber: page,
    };

    GetMessages(props.conversation.id, query).then((result) => {
      if(page === 1){
        setMessages(result)
      }
      else {
        setMessages([...messages, ...result]);
      }
    });
  }

  const retrieveMoreEvent = (e) => {
		//var top = e.target.scrollHeight - e.target.scrollBottom - e.target.clientHeight < 50;
    
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) 
        var top = true;
		if(top){
      let pg = page+1;
			setPage(pg);
			getMessages(pg);
		}
	}

  return (
    <div className="messages-container">
      <Receiver className="receiver" receiverName={props.conversation.name} />

      <div className="messages-view" onScroll={retrieveMoreEvent}>
        {messages.length !== 0
          ? messages.slice(0).reverse().map((message) => (
              <Message
                message={message}
                content={message.content}
                userId={message.senderId}
                myId={props.currentUserId}
                key={message.id}
              />
            ))
          : <></>}
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
