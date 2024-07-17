import React, { useState } from "react";

function Embed({ eventDatabase }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [eventId, setEventId] = useState("");
  function handleClose() {
    console.log("close initiated");
    setShowEmbed(false);
  }
  function embedEvent(id) {
    setEventId(id);
    setShowEmbed(true);
  }
  return (
    <div>
      {eventDatabase.map((event, index) => (
        <div key={index}>
          {event.name}
          <button onClick={() => embedEvent(event.id)} className="btn btn-dark">Register</button>
        </div>
      ))}
      {showEmbed && (
        <div class="luma-checkout--overlay luma-show luma-iframe-loaded">
          <button class="luma-checkout--close-btn" onClick={handleClose}>
            <img src="https://embed.lu.ma/static/x.svg" />
          </button>
          <svg class="luma-spinner" viewBox="0 0 66 66">
            <circle
              fill="none"
              r="30"
              cx="33"
              cy="33"
              stroke-width="6"
              stroke-linecap="round"
            ></circle>
          </svg>
          <div class="luma-checkout--modal">
            <iframe
              src={`https://lu.ma/embed-checkout/${eventId}`}
              allowfullscreen="true"
              style={{border: "0px", width: "100%", height: "100%",}}
            ></iframe>
          </div>
          <div class="luma-checkout--by">
            Processed securely by{" "}
            <a href="https://lu.ma" target="_blank">
              - Luma
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Embed;
