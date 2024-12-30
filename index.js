import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;
const hostname = "127.0.0.1";
app.use(express.json());

const teas = [];
let nextId = 1;

// add a tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teas.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teas);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const teaId = req.params.id;
  const tea = teas.find((t) => t.id === parseInt(teaId));
  if (!teaId) res.status(404).send("Tea not found");
  else res.status(200).send(tea);
});

// update a tea
app.put("/teas/:id", (req, res) => {
  const teaId = req.params.id;
  const teaIndex = teas.findIndex((t) => t.id === parseInt(teaId));
  if (teaIndex === -1) res.status(404).send("Tea not found");
  else {
    teas[teaIndex].name = req.body.name || teas[teaIndex].name;
    teas[teaIndex].price = req.body.price || teas[teaIndex].price;
    res.status(202).send(teas[teaIndex]);
  }
});

// delete a tea
app.delete("/teas/:id", (req, res) => {
  const teaId = req.params.id;
  const teaIndex = teas.findIndex((t) => t.id === parseInt(teaId));
  if (teaIndex === -1) res.status(404).send("Tea not found");
  else {
    teas.splice(teaIndex, 1);
    res.status(200).send("Deleted");
  }
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});
