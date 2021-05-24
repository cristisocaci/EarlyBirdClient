import "./Receiver.scss";
import {useHistory} from 'react-router-dom';

function Receiver(props){
    const history = useHistory();
    
    function redirectTo(page){
        history.push(page);
    }
    
    return(
        <div className="receiver">
            <h2 className="receiver-name" onClick={() => {redirectTo('/users/' + props.receiverId)}}>{props.receiverName}</h2>
        </div>
    );
}

export default Receiver;