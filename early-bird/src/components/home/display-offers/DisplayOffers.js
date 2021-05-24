import "./DisplayOffers.scss";
import Card from "./card/Card";

function DisplayOffers(props){

    return(
        <div className="card-grid">
            {props.offers ? props.offers.slice(0).reverse().map ((card, index) => (
                <Card 
                    className="card-element"
                    offerId={card.id}
                    title={card.title}
                    cost={card.cost}
                    publisher={card.publisher}
                    location={card.location}
                    categories={card.categories}
                    key={index}
                />
            )) : <div></div>}
        </div>
    );
}

export default DisplayOffers;