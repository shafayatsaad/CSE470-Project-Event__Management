// import { Link } from "react-router-dom";
import axios from "axios";
import "./EventCard.css";
import {loadStripe} from '@stripe/stripe-js'

const EventCard = ({ id, heading, date, location, img, TicketPrice }) => {
  const { year, month } = date;

  const needsExpansion = year.length > 4 || month.length > 0 || location.length > 0;
  const cardClass = needsExpansion ? "card expanded" : "card";
  
  const buyTicket = async () => {
    window.localStorage.setItem("EventID", id);
    const stripe = await loadStripe("pk_test_51P4sG6032hYtnpnt3Q7gscNwJiPznEl4IDE7UV5D0e3Z78Bjubd3ScvLigs5l1AdsXLiu3qZXG1qAeRQ3lXxVSLz00sh88Yqcy");
  
    try {
      const response = await axios.post("http://localhost:8080/create-checkout-session", {
        products: [{
          name: heading,
          imgURL: img,
          price: TicketPrice
        }]
      });
  
      // console.log(response)
      const session = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId
      });

      await axios.put("http://localhost:8080/user", {
        username: window.localStorage.getItem("username"),
        purchasedEventID: id
      });

      if (result.error) {
        console.error(error);
      }

    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };  

  return (
    // <Link to={`/events/${id}`}>
      <div className={cardClass}>
        <div className="card-content">
          <h4>Event ID: {id}</h4>
          <h3>{heading}</h3>
          <p>
            <span>
              Year: {year}
              <br />
              Month: {month}
              <br />
              {location}
            </span>
          </p>
          <button onClick={buyTicket} className='buy-button' type='submit'>Price: <strong className="ishtrong"> {TicketPrice} </strong>BDT</button>
        </div>
        <div className="card-img-wrapper">
          <img src={img} alt="image not found" />
        </div>
      </div>
    // </Link>
  );
};

export default EventCard;
