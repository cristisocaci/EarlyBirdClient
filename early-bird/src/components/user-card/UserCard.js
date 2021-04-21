import "./UserCard.scss";

function UserCard(props){

    function renderName(){
        if(props.user == null) return;
        return props.user.firstname + " " + props.user.lastname;
    }

    return (
        <div className="user-card--center">
            <div className="user-card">
                <div className="user-card__header">{props.header}</div>
                <div className="user-card__avatar"></div>
                <div className="user-card__name">{renderName()}</div>
                <div className="user-card__rating">
                </div>
            </div>
        </div>
    );
}

export default UserCard;