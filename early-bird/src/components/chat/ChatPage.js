import "./ChatPage.scss";
import noConversationIllustration from "../../illustrations/Saly-messaging.svg"
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from "react";
import { GetConversations, GetMessages } from "../../services/ChatService";
import { GetUserId } from "../../services/AccountService";
import { GetUserById } from "../../services/UsersService";
import MessagesContainer from "./messages-container/MessagesContainer.js"
import Conversation from "./conversation/Conversation";

import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';

function ChatPage() {
  const [convFromChild, setConvFromChild] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [connection, setConnection] = useState(null);

  let userId = GetUserId();
  const dispatch = useDispatch();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl(sessionStorage.getItem("server") + '/chat',{
            accessTokenFactory: () =>localStorage.getItem("jwt")
        })
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
}, []);

  useEffect(() => {
    console.log(userId);
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

  return (
    <div className="chat-container">
      <div className="conversations">
        <Conversation 
            conversations={conversations} 
            convToParent={conv => setConvFromChild(conv)}
        />
        {console.log(convFromChild)}
      </div>

      <div className="messages">
      {convFromChild ? 
        <MessagesContainer 
            currentUserID={userId}
            conversation={convFromChild}
            connection={connection}
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
