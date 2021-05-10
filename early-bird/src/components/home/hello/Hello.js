function GetText(role){
    switch(role){
        case "publisher":
            return "Here are your offers";
        case "worker":
            return "Here are today’s offers";
        default:
            return "";
    }
}
function Hello(props){
    return(
        <div>
            <h1>Hello, <span className="text-red">{props.name}</span></h1>
            <h4>{GetText(props.role)}</h4>
        </div>
    );
}

export default Hello;