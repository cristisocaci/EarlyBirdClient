import "./Card.scss";
import {useHistory} from 'react-router-dom';
function Card(props){
    const history = useHistory();

    function redirectTo(page){
        history.push(page);
    }

    return(
        <div className="card-element" onClick={() => redirectTo(`/offers/${props.offerId}`)}>
            <div className="card-element__upper">
                <div className="card-element__upper__title">{ props.title }</div>
                <div className="card-element__upper__cost">{ props.cost } $</div>
            </div>

            <div className="card-element__lower">
                <div className="card-element__lower__publisher">
                    <span>{ props.publisher.firstname } </span>
                    <span>{ props.publisher.lastname }</span>
                </div>
                <div className="card-element__lower__categories-grid">
                    {
                        props.categories.map((category, index) => (
                            <div className="bg-red round text-white px-2 py-1 m-1" key={index}>{category.category.name}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;