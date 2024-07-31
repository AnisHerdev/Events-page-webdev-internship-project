import { useEffect, useState } from "react";
import "./App.css";
import Calender from "./calender";
import { Display } from "./components/Display";
import axios from "axios";
import  {AddEvent}  from "./components/AddEvent";


function App() {
  const [database,setDatabase] = useState([]);
  const [filterdDatabase,setFilteredDatabase] = useState([]);
  const [showAddEvent,setShowAddEvent]= useState(false);
  useEffect(() => {
    axios.get('http://localhost:3000/items')
      .then(response => {
        setDatabase(response.data);
        setFilteredDatabase(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(database)
  function handleSearch(query){

    if(query){
      setFilteredDatabase(database.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())));
    }
    else{
      setFilteredDatabase(database);
    }
  }
  return (
    <div>
      <h1 className="heading">Events Page</h1>
        <input className="searchTerm" type="text" placeholder="Search..." onChange={(e)=>handleSearch(e.target.value)}></input>
        <button onClick={()=>{setShowAddEvent(true)}}>Add Event</button>
        {showAddEvent && <AddEvent></AddEvent>}
      <section>
            <Display database={filterdDatabase}></Display>
        <div>
          <Calender database={database} />
        </div>
      </section>
    </div>
  );
}

export default App;
