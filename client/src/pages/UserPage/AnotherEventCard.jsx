import "./AnotherEventCard.css";
const AnotherEventCard = ({ id, heading, date, location, img }) => {
  const { year, month } = date;

  const needsExpansion =
    year.length > 4 || month.length > 0 || location.length > 0;
  const cardClasss = needsExpansion ? "card expandeded" : "card";

  return (
    // <div className="container">
      <div className={cardClasss} id="hello">
        <div className="card-content-1">
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

        </div>
        
        <div className="card-img-wrapper-1">
          <img src={img} alt="image not found" />
        </div>

      </div>
    // </div>
  );
};

export default AnotherEventCard;
