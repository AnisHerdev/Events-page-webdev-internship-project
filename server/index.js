const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/eventsDb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const itemSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  date: String,
  organiser: String,
  noOfParticipants: Number,
  eventId: String,
});
const Item = mongoose.model("Event", itemSchema);

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Item.findByIdAndDelete(id);
      res.status(200).send({ message: 'Item deleted successfully' });
  } catch (err) {
      res.status(500).send(err);
  }
});

app.put('/items/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { subject, startTime, endTime } = req.body;
      const updatedItem = await Item.findByIdAndUpdate(id, { subject, startTime, endTime }, { new: true });
      res.status(200).send(updatedItem);
  } catch (err) {
      res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
