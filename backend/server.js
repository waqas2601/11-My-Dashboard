const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB connection (replace with your own connection string)
mongoose
  .connect(
    "mongodb+srv://mw2601005_db_user:5tQRy96IMxxjaopK@cluster0.gjnvbrb.mongodb.net/fooddb?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Food schema & model
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  img: { type: String, required: true },
});
const Food = mongoose.model("Food", foodSchema);

// Default route
app.get("/", (req, res) => {
  return res.json("Hello world");
});

// ---------------------- CRUD Routes ----------------------

// CREATE a food item
app.post("/api/foods", async (req, res) => {
  try {
    const food = new Food(req.body);
    console.log(food);
    await food.save();
    res.status(201).json({ status: true, message: "Your data is stored" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all food items
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single food item by ID
app.get("/api/foods/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a food item by ID
app.put("/api/foods/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json({
      status: 200,
      message: "Your item has been updated successfully.",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a food item by ID
app.delete("/api/foods/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------------------------------------------------

// Start server
app.listen(3000, () => console.log("🚀 Server running on PORT 3000"));
