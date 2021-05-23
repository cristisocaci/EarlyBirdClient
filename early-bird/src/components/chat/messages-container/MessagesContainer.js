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
    if (props.connection) {
      props.connection
        .start()
        .then((result) => {
          console.log("Connected!");

          props.connection.on("ReceiveMessage", (message) => {
            // const updatedChat = [...latestChat.current];
            // updatedChat.push(message);
            // setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [props.connection]);

  useEffect(() => {
    let query = {
      pageSize: 10,
      pageNumber: 1,
    };

    GetMessages(props.conversation.id, query).then((result) => {
      setMessages(result);
    });
  }, [props.conversation.id]);

  console.log(props.currentUserId);
  return (
    <div className="messages-container">
      <Receiver className="receiver" receiverName={props.conversation.name} />

      <div className="messages-view">
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
