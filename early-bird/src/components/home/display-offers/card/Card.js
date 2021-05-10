import "./Card.scss";
import {useHistory} from 'react-router-dom';
function Card(props){
    const history = useHistory();

    function redirectTo(page){
        history.push(page);
    }

    return(
        <div className="card-element" onClick={() => redirectTo(`/offers/${props.offerId}`)}>
            <div className="card-upper">
                <div className="title">{ props.title }</div>
                <div className="cost">{ props.cost } $</div>
            </div>

            <div className="card-lower">
                <div className="publisher">
                    <span>{ props.publisher.firstname } </span>
                    <span>{ props.publisher.lastname }</span>
                </div>
                <div className="categories-grid">
                    {
                        props.categories.map((category, index) => (
                            <span className="bg-red round text-white px-2 py-1 m-1" key={index}>{category.category.name}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;