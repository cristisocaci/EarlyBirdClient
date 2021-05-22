import "./MessagesContainer.scss";
import Receiver from "./receiver/Receiver.js"
import Message from "./message/Message.js"
import SendMessage from "./send-message/SendMessage.js"

function MessagesContainer(props){


    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        try {
            await  fetch(sessionStorage.getItem("server") + '/api/chat/messages', { 
                method: 'POST', 
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }

    return(
        <div className="messages-container">
            <Receiver 
                className="receiver" 
                receiverName={props.name}

            />
            <div className="messages">

            </div>
            <SendMessage 
                className="send-message" 
                sendMessage={sendMessage}
    
            />
        </div>
    );
}

export default MessagesContainer;
