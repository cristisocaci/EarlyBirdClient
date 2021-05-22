import "./Conversation.scss";

function Conversation(props) {
  
 function renderConversations(){
    if(props.conversations===null) return;
     console.log(props.conversations);


     let convSort = props.conversations.sort(x => x.newMessage ? -1:1)

     return convSort.map((conv) => (
      <div key={conv.id} className="conv-item">
        
          <div className="conv-item__avatar" >{renderInitials(conv.name)}</div>
            <div className="conv-item__info">
              <p className="conv-item__name">{conv.name}</p> 
              {conv.newMessage ? <p className="conv-item__new-mess">New Messages</p> : 
              <p className="conv-item__new-mess__no">No new Messages</p>}
            </div>
      </div>
      ))
 }

 function renderInitials(name){
  const words = name.split(' ');
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

  return (
    <div>
      <div className="messages-subtitle">Messages 💬</div>
      <div>
        {renderConversations()}
      </div>
    </div>
  );
}

export default Conversation;
