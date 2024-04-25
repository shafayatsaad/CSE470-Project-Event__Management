import React, { useEffect, useState } from "react";
import axios from "axios";
import AnotherEventCard from "./AnotherEventCard";
import "./UserPage.css";

const PurchasedEvents = () => {
  const [purchasedEvents, setPurchasedEvents] = useState([]);

  useEffect(() => {
    const fetchPurchasedEvents = async () => {
      try {
        const username = window.localStorage.getItem("username");
        const response = await axios.get(
          `http://localhost:8080/my-purchased-events/${username}`
        );
        setPurchasedEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching purchased events:", error);
      }
    };

    fetchPurchasedEvents();
  }, []);

  return (
    <div>
      <h2>Your Purchased Events</h2>

      <div className="full-box">
        <h1 className="middle-align">Purchased Event</h1>
        {purchasedEvents.map((event) => (
          <AnotherEventCard
            key={event._id}
            id={event.id}
            heading={event.heading}
            date={event.date}
            location={event.location}
            img={event.imgURL}
          />
        ))}
      </div>
    </div>
  );
};

export default PurchasedEvents;
