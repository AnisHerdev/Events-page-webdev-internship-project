import React, { useState } from "react";
import axios from "axios";

export const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    date: "",
    organiser: "",
    noOfParticipants: "",
    eventId: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // Convert noOfParticipants to a number if it's not empty
    const dataToSend = {
      ...formData,
      noOfParticipants: formData.noOfParticipants
        ? Number(formData.noOfParticipants)
        : 0,
    };

    axios
      .post("http://localhost:3000/items", dataToSend)
      .then((res) => {
        console.log("Event added:", res.data);
        // Reset form or handle success
        setFormData({
          title: "",
          image: "",
          description: "",
          date: "",
          organiser: "",
          noOfParticipants: "",
          eventId: "",
        });
      })
      .catch((err) => {
        console.error("Error adding event:", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="add-event-form">
      <h2>Add Event</h2>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image Url:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Organiser:
          <input
            type="text"
            name="organiser"
            value={formData.organiser}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          No of Participants:
          <input
            type="number"
            name="noOfParticipants"
            value={formData.noOfParticipants}
            onChange={handleChange}
          />
        </label>
        <label>
          Event ID:
          <input
            type="text"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};
