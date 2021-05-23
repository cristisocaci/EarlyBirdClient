import "./ChatPage.scss";
import noConversationIllustration from "../../illustrations/Saly-messaging.svg"
import { useEffect, useState, useRef} from "react";
import { GetConversations } from "../../services/ChatService";
import { GetUserId } from "../../services/AccountService";
import { GetUserById } from "../../services/UsersService";
import MessagesContainer from "./messages-container/MessagesContainer.js"
import Conversation from "./conversation/Conversation";

import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';
import {useParams} from "react-router-dom";

function ChatPage(props) {
  const {isRedirect} = useParams();
  const [convFromChild, setConvFromChild] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);
  const conversationsRef = useRef(null);
  messagesRef.current = messages;
  conversationsRef.current = conversations;

  let userId = GetUserId();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.connection) {
      props.connection.on("ReceiveMessage", (message) => {
        let convAux = [...conversationsRef.current];
        for (let i = 0; i < convAux.length; i++) {
          console.log();
          if (convAux[i].id === message.conversationId) {
            convAux[i].newMessage = true;
            setConversations(convAux);
            break;
          }
        }
        if (convFromChild.id === message.conversationId) {
          let messAux = {
            senderId: convFromChild.receiverId,
            content: message.message,
          };
          setMessages([messAux, ...messagesRef.current]);
        }
      });
    }
  }, [props.connection, convFromChild]);

  useEffect(() => {
      if (isRedirect === "true") {
        let currentConv = JSON.parse(sessionStorage.getItem("conversationRedirect"))
        setConvFromChild(currentConv);
      }
  }, [isRedirect])

  useEffect(() => {
    async function createUsersList() {
      dispatch(startLoader());
      let convAux = [];
      let conv = await GetConversations();

      await Promise.all(conv.map(async (item) => {
        let interlocutorId = item.firstId === userId ? item.secondId : item.firstId;
        let interlocutor = await GetUserById(interlocutorId);
        let newConv = {
          id: item.id,
          newMessage: item.newMessage,
          receiverId: interlocutorId,
          name: interlocutor.firstname + " " + interlocutor.lastname,
        };
        convAux.push(newConv);
      }));
      setConversations(convAux);
      dispatch(stopLoader());
    }
    createUsersList();
    
  }, [userId, dispatch]);

  function newMessageUpdate(conv){
    let convAux = [...conversationsRef.current];
    for(let i =0; i<convAux.length; i++){
      if(convAux[i].id === conv.id){
        convAux[i].newMessage = false; 
        setConversations(convAux);
        break;
      }
    }
    setConvFromChild(conv);
  }

  return (
    <div className="chat-container">
      <div className="conversations">
        <Conversation 
            conversations={conversations} 
            convToParent={conv => newMessageUpdate(conv)}
        />
      </div>

      <div className="messages">
      {convFromChild ? 
        <MessagesContainer 
            currentUserID={userId}
            conversation={convFromChild}
            connection={props.connection}
            messages = {messages}
            setMessages = {setMessages}
        /> :
        <div className="no-conversation">
            <img className="illustration" src={noConversationIllustration} alt="no-conversation-illustration" />
            <h3 className="text">Check your incoming messages</h3>
        </div>
     }
        
      </div>

    </div>
  );
}

export default ChatPage;
