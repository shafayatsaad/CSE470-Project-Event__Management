import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import './DeleteEvent.css'

const DeleteEvent = () => {
    const [message, setMessage] = useState('');
    const [eventID, setEventId] = useState({
        id: 0,
    });

    const handleChange = (e) => {
        setEventId(e.target.value);
        // console.log(eventID);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/delete-event/${eventID}`)
            // console.log(response);
            if (response.status === 200) {
                setMessage("Event Deleted");
                setEventId({}); // Clear event ID input
            } else {
                setMessage("Event was not found in the Database");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            setMessage("Error deleting event. Please try again.");
        }
    }    


    return (
        <div className='container'>
            <div className='boxx'>
                <div className='Delete-an-event'>
                    <h2 className='main-title'>Delete Event!</h2>
                </div>
                <form className='delete-event-form' onSubmit={onSubmit}>
                    <input  type="text" id="id" name="id" onChange={handleChange} placeholder='Enter Event ID Number'/>
                </form>
                <button onClick={onSubmit} className='delete-button' type='submit'>Delete event</button>
                {message && <p className='message'>{message}</p>}
            </div>
        </div>
    );
}

export default DeleteEvent
