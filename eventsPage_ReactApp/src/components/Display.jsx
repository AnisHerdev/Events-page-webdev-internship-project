import React from "react";
import { useState } from "react";

export const Display = ({ database }) => {
    const [showEmbed, setShowEmbed] = useState(false);
  const [eventId, setEventId] = useState("");
  function handleClose() {
    console.log("close initiated");
    setShowEmbed(false);
  }
  function embedEvent(id) {
    console.log("embed initiated",showEmbed);
    setEventId(id);
    setShowEmbed(true);
  }
  return (
    <div className="container">
      <div className="cards">
        {database.map((event, i) => (
          <div key={i} className="card">
            <img src={event.image} alt={event.image}></img>
            <div className="card-details">
              <h1>{event.title}</h1>
              <h3>{event.description}</h3>
              <h3>Event date: {event.date}</h3>
              <div className="event-details-bottom">
                <h3>Organiser: {event.organiser}</h3>
              </div>
              <div className="event-last-line">
                <div>
                  <h3>Event ID: {event.eventId}</h3>
                </div>
                <h3 className="NoOfPeople">
                  No of people registered: {event.noOfParticipants}
                </h3>
                <div>
                  <button className="register-button" onClick={() => embedEvent(event.eventId)}>Register</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {showEmbed && (
        <div className="luma-checkout--overlay luma-show luma-iframe-loaded">
          <button className="luma-checkout--close-btn" onClick={handleClose}>
            <img src="https://embed.lu.ma/static/x.svg" />
          </button>
          <svg className="luma-spinner" viewBox="0 0 66 66">
            <circle
              fill="none"
              r="30"
              cx="33"
              cy="33"
              stroke-width="6"
              stroke-linecap="round"
            ></circle>
          </svg>
          <div className="luma-checkout--modal">
            <iframe
              src={`https://lu.ma/embed-checkout/${eventId}`}
              allowfullscreen="true"
              style={{border: "0px", width: "100%", height: "100%",}}
            ></iframe>
          </div>
          <div className="luma-checkout--by">
            Processed securely by{" "}
            <a href="https://lu.ma" target="_blank">
              - Luma
            </a>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
