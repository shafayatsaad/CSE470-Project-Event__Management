import React, { useState } from 'react';
import './CreateEvent.css';

const CreateEvent = () => {
    const [message, setMessage] = useState('');

    const [event, setEvent] = useState({
        id: 0,
        heading: "",
        date: {
            year: 0,
            month: "",
        },
        location: "",
        imgURL: "",
        TicketPrice:0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "year" || name === "month") {
            setEvent({
                ...event,
                date: {
                    ...event.date,
                    [name]: value
                }
            });
        } else {
            setEvent({
                ...event,
                [name]: value
            });
        }
    };

    const onSubmit = async(e) =>{
        try{    
            e.preventDefault();
            const response = await fetch('http://localhost:8080/create-event', {
                method: 'POST',
                body: JSON.stringify(event),
                headers: {
                        'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (response.ok) {
                setEvent({});
                setMessage(data.message);
                // window.location.pathname='/';
            }
            else {
                setMessage(data.message);
            }
        }
        catch(err){
            console.error(err);
        }
    };

    return (
        <div className='container'>
            <div className='boxx'>
                <div className='create-an-event'>
                    <h2 className='main-title'>Create an Event!</h2>
                </div>
                <form className='create-event-form' onSubmit={onSubmit}>
                    <label htmlFor='id'>ID Number</label>
                    <input type="text" id="id" name="id" onChange={handleChange} />
                    <label htmlFor='heading'>Heading</label>
                    <input type="text" id="heading" name="heading" onChange={handleChange} />
                    <div>
                        <label htmlFor='month'>Month</label>
                        <input type="text" id="month" name="month" onChange={handleChange} />
                        <label htmlFor='year'>Year</label>
                        <input type="text" id="year" name="year" onChange={handleChange} />
                    </div>
                    <label htmlFor='location'>Location</label>
                    <input type="text" id="location" name="location" onChange={handleChange} />
                    <label htmlFor='imgURL'>Image URL</label>
                    <input type="text" id="imgURL" name="imgURL" onChange={handleChange} />
                    <label htmlFor='imgURL'>Ticket Price</label>
                    <input type="text" id="TicketPrice" name="TicketPrice" onChange={handleChange} />
                </form>
                <button onClick={onSubmit} className='create-button' type='submit'>Create the event</button>
                {message && <p className='message'>{message}</p>}
            </div>
        </div>
    );
};

export default CreateEvent;
