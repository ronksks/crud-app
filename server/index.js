const express = require("express");
const mongoose = require("mongoose");
const app = express();
const FoodModel = require("./models/Food");
const cors = require("cors");
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://admin-ronksks:Test123@cluster0.80wja.mongodb.net/foodDB",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const { foodName, grade } = req.body.food;

  console.log(req.body.food.foodName);
  const food = new FoodModel({
    foodName: foodName,
    grade: grade,
  });
  // food.save().then(result => { console.log(result);}).catch(err => console.log(err));
  // await food.find({ foodName: 'john', age: { $gte: 18 } }).exec();

  try {
    await food.save();
    console.log(food.foodName + " was added to foodDB successuly");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  var foundFoodNameToDelete = "";
  FoodModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      try {
        foundFoodNameToDelete = result.foodName;
      } catch (err) {
        console.log(err);
      }
    }
  });
  try {
    await FoodModel.findByIdAndRemove(id).exec();
    console.log(foundFoodNameToDelete + " was deleted");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  //recive the id and the new name to update the currect id with the new name
  const { id, newFoodName } = req.body;

  try {
    // look for the id and set the value of the foodName field to the new foodName,
    //include a callback function the handels the err
    await FoodModel.findByIdAndUpdate(id, { foodName: newFoodName });
  } catch (err) {
    console.log(err);
  }
  console.log("Updated food: ", newFoodName);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001..");
});
