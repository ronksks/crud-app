import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Food from "./components/Food";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TextField } from "@mui/material";

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
    Axios.get("https://rate-your-food.herokuapp.com/read").then((response) => {
      // if(response.data= null){
      //   setFoodList("");
      // }
      setFoodList(response.data);
    });
  }, [foodList]);

  function handleSubmit() {
    Axios.post("https://rate-your-food.herokuapp.com/insert", { food: food });
    setFood(() => {
      return {
        foodName: "",
        grade: "",
      };
    });
  }

  function deleteFood(id) {
    // to pass id as parameter, we change the "url" => `url` and add the $(param)
    Axios.delete(`https://rate-your-food.herokuapp.com/delete/${id}`);
  }
  function updateFood(id, newFoodName) {
    Axios.put("https://rate-your-food.herokuapp.com/update", { id: id, newFoodName });
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Rate your food</h1>
      </div>

      <div className="layout">
        <div className="form">
          <TextField
            value={food.foodName}
            onChange={handleChange}
            name="foodName"
            id="standard-basic"
            label="Food Name"
            variant="standard"
          />
          <TextField
            value={food.grade}
            onChange={handleChange}
            name="grade"
            type="number"
            id="standard-basic"
            label="Grade"
            variant="standard"
          />
          <AddCircleOutlineIcon id="addButton" onClick={handleSubmit} />

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
                    onUpdate={updateFood}
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
