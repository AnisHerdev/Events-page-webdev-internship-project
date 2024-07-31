import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

function Calender(database) {
  const events = [
    {
      date: new Date("2024-08-19"),
      title: "Python Club",
      details: "Weekly meeting of the Python Club.",
    },
    {
      date: new Date("2024-08-19"),
      title: "Java Club",
      details: "Monthly meeting of the Java Club.",
    },
  ];

  const [value, setValue] = useState(new Date());
  const [activeDate, setActiveDate] = useState(null);

  const tileContent = ({ date, _ }) => {
    const eventOnDate = events.find((event) => checkDay(event.date, date));
    if (eventOnDate) {
      return <div className="event-dot" />;
    }
    return null;
  };

  const onClickDay = (date) => {
    setActiveDate(date);
  };

  const checkDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getEventDetails = () => {
    const eventsOnDate = events.filter((event) =>
      checkDay(event.date, activeDate)
    );
    if (eventsOnDate.length > 0) {
      return eventsOnDate.map((event, index) => (
        <div key={index} className="event-details">
          <h2>{event.title}</h2>
          <p>{event.details}</p>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <Calendar
          onChange={setValue}
          value={value}
          tileContent={tileContent}
          onClickDay={onClickDay}
          className="react-calendar"
        />
      </div>
      <div className="event-details-container">
        {activeDate && getEventDetails()}
      </div>
    </div>
  );
}

export default Calender;
