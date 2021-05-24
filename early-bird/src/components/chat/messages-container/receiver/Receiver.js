import "./Receiver.scss";

function Receiver(props){

    return(
        <div className="receiver">
            <h2 className="receiver-name">{props.receiverName}</h2>
        </div>
    );
}

export default Receiver;