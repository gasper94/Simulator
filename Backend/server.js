const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const Simulation = require("./models/Simulation");

/* CREATE */
// const newSimulation = new Simulation({
//   id: "1234567",
//   environment: "environment-w",
//   userPersona: "Dr. Dog",
//   racks: "Rack name",
//   sample: "sample name",
//   analysisFiles: "File name"
// });
// newSimulation
//   .save()
//   .then(item => console.log(item))
//   .catch(err => console.log(err));

/*  READ */
// Simulation.find()
//   .sort({ date: -1 })
//   .then(items => console.log(items));

/*  UPDATE  */
// Simulation.findOneAndUpdate(
//   { _id: "5e617aa0e846ba25f6a0e3e8" },
//   { environment: "environment-y" }
// ).then(item => console.log(item));

/* DELETE */
// Simulation.findOneAndDelete(
//   { _id: "5e617d7bd2a322266f9cdc30" },
//   { environment: "environment-w" }
// ).then(console.log("Item deleted"));

/* ENDPOINTS */

// GET
app.get("/", (req, res) => {
  Simulation.find()
    .sort({ date: -1 })
    .then(items => console.log(res.json(items)));
});

// POST
app.post("/", (req, res) => {
  const newSimulation = new Simulation({
    name: req.body.name,
    id: req.body.id,
    environment: req.body.environment,
    userPersona: req.body.userPersona,
    racks: req.body.racks,
    sample: req.body.sample,
    analysisFiles: req.body.analysisFiles
  });
  newSimulation.save().then(item => res.json(item));
});

// DELETE
app.delete("/:id", (req, res) => {
  Simulation.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

// UPDATE
app.put("/:id", (req, res) => {
  Simulation.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

const port = 5000;
app.listen(port, () =>
  console.log(`Server started on port: http://localhost:${port}`)
);
