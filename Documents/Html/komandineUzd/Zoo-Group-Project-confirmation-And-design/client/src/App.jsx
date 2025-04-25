import { useState, useEffect } from "react";
import axios from "axios";
import Create from "./components/Create"
import Card from "./components/Card";


function App() {
  const [data, setData] = useState([]);
  const refreshData=()=>{
    axios
    .get('http://localhost:5000/getAnimals')
    .then((res) => setData(res.data))
    .catch((error) => console.log(error));
  }
  useEffect(() => {
    refreshData()
  }, []);
 

  return (
    <>
    <header>
      <h1>Zoo Crud</h1>
    </header>
     <Create refreshData={refreshData}/>
     <div className="cardContainer">
      {/* filtravimas, paieska */}
      <Card data={data} refreshData={refreshData}/>
     </div>
    </>
  )
}

export default App
