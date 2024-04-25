import EventCard from "../../components/EventCard/EventCard.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import "./EventList.css";
import { useEffect,useState } from "react";
import axios from 'axios'


const EventList = () => {
  const [DB, setDB] = useState([]);
    useEffect(() => {
        const fetchEvents = async() =>{
            try{
                const response = await axios.get("http://localhost:8080/")
                setDB(response.data);
                console.log(response.data);
            }
            catch(err){
                console.error(err);
            }
        }
        fetchEvents();
        window.localStorage.setItem("EventID", null);
    }, [])

  
  const renderEventCards = () => {
    return DB.map(({ id, date, heading, location, imgURL,TicketPrice }) => {
      return (
        <EventCard 
          key={id}
          id={id}
          date={date}
          heading={heading}
          location={location}
          img={imgURL}
          TicketPrice={TicketPrice}
          className="events"
        />
      );
    });
  };


  return (
    <div>
      <Navigation/>
      <div className="event-list-wrapper">
        <div className="event-list">
          {DB.length > 0 ? (
            renderEventCards()
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventList;
