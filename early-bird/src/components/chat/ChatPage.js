import "./ChatPage.scss";
import noConversationIllustration from "../../illustrations/Saly-messaging.svg"
import { useEffect, useState } from "react";
import { GetConversations } from "../../services/ChatService";
import { GetUserId } from "../../services/AccountService";
import { GetUserById } from "../../services/UsersService";
import MessagesContainer from "./messages-container/MessagesContainer.js"
import Conversation from "./conversation/Conversation";

import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';

function ChatPage() {
  const [conversations, setConversations] = useState(null);
  let userId = GetUserId();
  const dispatch = useDispatch();

  useEffect(() => {

    async function createUsersList() {
      dispatch(startLoader());
      let convAux = [];
      let conv = await GetConversations();

      await Promise.all(conv.map(async (item) => {
        let interlocutorId = item.firstId === userId ? item.secondId : item.firstId;
        let interlocutor = await GetUserById(interlocutorId);
        let newConv = {
          ...item,
          name: interlocutor.firstname + " " + interlocutor.lastname,
        };
        convAux.push(newConv);
      }));
      setConversations(convAux);
      dispatch(stopLoader());
    }
    createUsersList();
    
  }, [userId, dispatch]);

  let selectedConversation = '';

  return (
    <div className="chat-container">
      <div className="conversations">
        <Conversation conversations={conversations}></Conversation>
      </div>

      <div className="messages">
      {selectedConversation ? 
        <MessagesContainer 
            currentUserID={userId}
            interlocutorName={conversations.name}
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
