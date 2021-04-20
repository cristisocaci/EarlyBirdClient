import "./AboutOffer.scss";

function AboutOffer(props){

    function renderCategories(){
        if(props.categories==null) return;
        return props.categories.map((x,index) =>
            <span key={index}>{x.name}</span>
        )
    }
    return (
        <div>
            <div>
                <div>
                    <h2>{props.title}</h2>
                    <div>
                        {renderCategories()}
                    </div>
                </div>
                <div>
                    <h2>{props.cost}$</h2>
                </div>
            </div>
            <h4>Description of the task:</h4>
            <p>{props.description}</p>
            <h4>Prerequisites:</h4>
            <p>{props.prerequisites}</p>
            <h4>Location:</h4>
            <p>{props.location.streetName} {props.location.streetNumber}, {props.location.cityName}</p>
        </div>
    );
}

export default AboutOffer;