import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Food from "./components/Food";


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
  //also you can map trough the data and present it
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      // if(response.data= null){
      //   setFoodList("");
      // }
      setFoodList(response.data);
    });
  }, [foodList]);

  function handleSubmit() {
    Axios.post("http://localhost:3001/insert", { food: food });
    setFood(() => {
      return {
        foodName: "",
        grade: "",
      };
    });
  }

  function deleteFood(id) {
    // to pass id as parameter, we change the "url" => `url` and add the $(param)
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Rate your food</h1>
      </div>

      <div className="layout">
        <div className="form">
          <lable>Food Name:</lable>
          <input
            type="text"
            name="foodName"
            onChange={handleChange}
            value={food.foodName}
          />
          <label>Grade:</label>
          <input
            type="number"
            name="grade"
            onChange={handleChange}
            value={food.grade}
          />
          <button onClick={handleSubmit}>Submit</button>
          {/* <DeleteIcon /> */}
        </div>
        <div>
          <h1>Food List</h1>
          <div className="food">
            {foodList.map((foodItem, index) => {
              return (
                <div className="foodItem">
                  <Food
                    key={index}
                    id={foodItem._id}
                    foodName={foodItem.foodName}
                    grade={foodItem.grade}
                    //we pass to the food item an attribute that contains a deleteFood function
                    // then we can access it trought the props inside the food item itself
                    onDelete={deleteFood}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
