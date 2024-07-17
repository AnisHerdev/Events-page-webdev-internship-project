import "./App.css";
import { useState } from "react";
import Embed from "./components/Embed";

function App() {
  const [eventName,setEventName]=useState("");
  const [eventId,setEventId]=useState("");
  const [eventDatabase,setEventDatabase]=useState([]);
  function handleEventNameChange(name){
    setEventName(name);
  }
  function handleEventIdChange(id){
    setEventId(id);
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(eventId,eventName);
    setEventId("");
    setEventName("");
    setEventDatabase([...eventDatabase,{name:eventName,id:eventId}]);
    console.log(eventDatabase);
    // window.open(`https://lu.ma/event/${eventId}`,"_blank");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 class="text-bg-primary p-3 " >Event Name:</h2>
        <input class = "form-control-sm opacity-75"  placeholder="Hackathon" type="text" value={eventName} onChange={(e)=>handleEventNameChange(e.target.value)} required></input><br></br><br></br>
        <h2 class="text-bg-primary p-3 " >Event ID:</h2>
        <input class = "form-control-sm opacity-75" placeholder="evt-***********" type="text" value={eventId} onChange={(e)=>handleEventIdChange(e.target.value)} required></input><br></br><br></br>
        <button type="submit">Add Event</button>
      </form>
      <Embed eventDatabase={eventDatabase}></Embed>
    </div>
  );
}

export default App;
