import "./Card.scss";

function Card(props){
    return(
        <div className="card-element">
            <div className="card-upper">
                <div className="title">{ props.title }</div>
                <div className="cost">{ props.cost } $</div>
            </div>

            <div className="card-lower">
                <div className="publisher">
                    <span>{ props.publisher.firstName } </span>
                    <span>{ props.publisher.lastName }</span>
                </div>
                {
                    props.categories.map((category, index) => (
                        <span className="categories bg-red round text-white px-2 py-1 m-1" key={index}>{category}</span>
                    ))
                }
            </div>
        </div>
    );
}

export default Card;