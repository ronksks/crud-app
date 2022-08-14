import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Food from "./components/Food";

function App() {
  const [food, setFood] = useState({
    foodName: "",
    grade: 0
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
        [name]: value
      };
    });
  }
  //recives the information from the backend
  //see the object in console response-> data
  //also you can map trough the data and present it
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
      // console.log(response);
    });
  }, []);

  function handleSubmit() {
    Axios.post("http://localhost:3001/insert", { food: food });
  }

  
  function deleteFood(id){
// to pass id as parameter, we change the "url" => `url` and add the $(param)
// console.log(id);
    Axios.delete(`http://localhost:3001/delete/${id}`);


  };

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
        {foodList.map((foodItem, index) => {
          return (
            <Food
              key={index}
              id={foodItem._id}
              foodName={foodItem.foodName}
              grade={foodItem.grade}
              //we pass to the note an attribute that contains a deleteNote function
              // then we can access it trought the props inside the note itself
              onDelete={deleteFood}
            />
            
          );


        })}
      </div>
    </div>
  );
}

export default App;
