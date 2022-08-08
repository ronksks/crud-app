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

app.listen(3001, () => {
  console.log("Server is running on port 3001..");
});
