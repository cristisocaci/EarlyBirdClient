import "./Conversation.scss";

function Conversation(props) {
  
 function renderConversations(){
    if(props.conversations===null) return;
     console.log(props.conversations);
     return props.conversations.map((conv, index) => (
      <div key={conv.id} className="conv-item">
        <h3>{conv.name}</h3>
        <p>{conv.newMessage}</p>
      </div>
      ))
 }

  return (
    <div>
      <div className="messages-subtitle">Messages</div>
      <div>
        {renderConversations()}
      </div>
    </div>
  );
}

export default Conversation;
