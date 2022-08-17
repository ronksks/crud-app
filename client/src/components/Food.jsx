import React,{useState} from "react";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { TextField } from "@mui/material";


function Food(props) {
  const[newFoodName, setNewFoodName]=useState({
    foodName:""
  });

  function handleChange(e){
    setNewFoodName(e.target.value);
  }
  function handleDelete() {
    // the food ID is sent back trough the props to the
    props.onDelete(props.id);
  }
  function handleUpdate(){
    props.onUpdate(props.id, newFoodName);

  }

  return (
    <div>
      <h1>{props.foodName}</h1>
      <p>{props.grade}</p>
      <div className ="foodItem">
      <TextField onChange={handleChange} id="standard-basic" label="Edit Food Name" variant="standard" />

      <EditTwoToneIcon className="foodIcons" onClick={handleUpdate} /> 
      <DeleteTwoToneIcon className="foodIcons"  onClick={handleDelete} />
      </div>
    </div>
  );
}

export default Food;
