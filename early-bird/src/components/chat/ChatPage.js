import "./ChatPage.scss";
import Conversation from "./conversation/Conversation";
import { useEffect, useState } from "react";
import { GetConversations, GetMessages } from "../../services/ChatService";
import { GetUserId } from "../../services/AccountService";
import { GetUserById } from "../../services/UsersService";

import {useDispatch} from 'react-redux';
import {startLoader, stopLoader} from '../../redux/actions';

function ChatPage() {
  const [convFromChild, setConvFromChild] = useState([]);
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
        <Conversation conversations={conversations} 
        convToParent={conv => setConvFromChild(conv)}></Conversation>
        {console.log(convFromChild)}
      </div>

      <div className="messages">
        <h3>here message components</h3>
      </div>
    </div>
  );
}

export default ChatPage;
