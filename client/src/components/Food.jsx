import React from "react";

function Food(props) {
  function handleDelete() {
    // the food ID is sent back trough the props to the
    //onDelete func in app.jsx
    props.onDelete(props.id);
  }

  return (
    <div>
      <h1>{props.foodName}</h1>
      <p>{props.grade}</p>
      <button onClick={handleDelete}> Delete
      </button>
    </div>
  );
}

export default Food;
