import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [food, setFood] = useState({
    foodName: "",
    grade: "",
  });
  const [foodList, setFoodList] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    // deconstructing the e.target into 2 consts
    setFood((prevFood) => {
      return {
        // the previous foods
        ...prevFood,
        // the [name] is the key, and the value is the content
        [name]: value,
      };
    });
  }
  //recives the information from the backend
  //see the object in console response-> data
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
      // console.log(response);
    });
  }, []);

  function handleSubmit() {
    Axios.post("http://localhost:3001/insert", { food: food });
  }

  return (
    <div className="App">
      <h1>Crud Application</h1>
      <div className="form">
        <label>Food Name:</label>
        <input type="text" name="foodName" onChange={handleChange} />
        <label>Grade:</label>
        <input type="number" name="grade" onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <h1>Food List</h1>
        {foodList.map((val, key) => {
          return (
            <div>
              <h1>{val.foodName}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
