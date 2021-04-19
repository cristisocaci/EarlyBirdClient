import "./DisplayOffers.scss";
import Card from "./card/Card";

function DisplayOffers(props){

    return(
        <div className="card-grid">
            {props.offers.map ((card) => (
                <Card 
                    className="card-element"
                    title={card.title}
                    cost={card.cost}
                    publisher={card.publisher}
                    location={card.location}
                    categories={card.categories}
                />
            ))}
        </div>
    );
}

export default DisplayOffers;