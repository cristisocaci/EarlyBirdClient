import axios from "axios";
import {GetUserId} from "./AccountService"; 

async function GetConversations() {
    let path = sessionStorage.getItem("server") + "/api/chat/conversations";
    try {
        let response = await axios.get(path, {
          headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")}
        });
        return response.data;
    } catch  {
      console.log("Error");
    }
  }

  async function GetMessages(id, queryParams) {
    let path = sessionStorage.getItem("server") + "/api/chat/conversations/"+ id +"/messages";
    try {
        let response = await axios.get(path, {
            headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")},
            params:queryParams
        });
        return response.data;
    } catch {
        console.log("Error");
    }
}

async function CreateConversation(senderId) {
  let userId = GetUserId();
  let path = sessionStorage.getItem("server") + "/api/chat/conversations";
  try {
    let response = await axios.post(path, {
        firstId: userId,
        secondId: senderId
      },
      {headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")}},
    );
    return response.data; 
  } catch  {
    console.log('Error retrieving conversations');
  }
}

async function CreateMessage(id, receiverId, message) {
  let path = sessionStorage.getItem("server") + "/api/chat/conversations/"+ id +"/messages";
  try {
    let response = await axios.post(path, {
        message: message,
        receiverId: receiverId
      },
      {headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")}}
    );
    return response.data; 
  } catch  {
    console.log('Error sending message');
  }
}

  export {GetConversations, GetMessages, CreateConversation, CreateMessage};