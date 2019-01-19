const mongoose = require("mongoose");
const products = require("./routes/products");
const config = require("config");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/mygrocery")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/products", products);
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port}...`));
