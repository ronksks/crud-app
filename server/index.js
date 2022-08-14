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
  // console.log(req.params.id);
  // FoodModel.find({}, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   const idFromDb = result.filter((id) => id == req.params.id);
  //   // console.log(idFromDb.grade);
  //   // console.log(idFromDb);
  // });
  await FoodModel.findByIdAndRemove(req.params.id).exec();
console.log(id +" deleted");
});

// FoodModel.findByIdAndRemove()
// const { id, foodName } = req.body.food;

// const id = mongoose.Types.ObjectId(req.params.id.trim());
// console.log(req.params.id);



app.listen(3001, () => {
  console.log("Server is running on port 3001..");
});
