import "./UserCard.scss";

function UserCard(props){
    function renderName(){
        if(props.user == null) return;
        return props.user.firstName + " " + props.user.lastName;
    }

    return (
        <div className="user-card">
            <div className="user-card__avatar"></div>
            <div className="user-card__name">{renderName()}</div>
        </div>
    );
}

export default UserCard;