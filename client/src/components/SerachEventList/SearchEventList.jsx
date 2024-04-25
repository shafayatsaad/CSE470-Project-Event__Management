import { useState, useEffect } from "react"
import EventCard from "../EventCard/EventCard"
import "./SearchEventList.css"
import axios from "axios"

const SearchEventList = ({monthYear})=>{
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


    const {selectedMonth,selectedYear}=monthYear;
    const filteredEvents = DB.filter((eventDetail)=>{
        return(
            eventDetail.date.year=== selectedYear &&
            eventDetail.date.month===selectedMonth
        )
    })

    const renderEventCards =()=>{
        return filteredEvents.map(({ id, date, heading, location, imgURL })=>{
            return(
                <EventCard
                key={id}
                id={id}
                date={date}
                heading={heading}
                location={location}
                img={imgURL}
                />
            )
        })
    }

    return(
       <>
       
         {filteredEvents.length>0 ?(
            <div className="filtered-feched-events">
                {renderEventCards()}
            </div>
         ):(
            <p>No Events in the date</p>
         )}
       </>
    )
}
export default SearchEventList;