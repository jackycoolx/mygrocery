const { Product, validate } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find()
    .limit(20)
    .sort({ name: 1 });
  res.send(products);
});

router.get("/name-a-z", async (req, res) => {
  const products = await Product.find()
    .limit(20)
    .sort({ name: 1 })
    .select(["-_id", "-__v"]);
  res.send(products);
});

router.get("/name-z-a", async (req, res) => {
  const products = await Product.find()
    .limit(20)
    .sort({ name: -1 })
    .select(["-_id", "-__v"]);
  res.send(products);
});

router.get("/brand-a-z", async (req, res) => {
  const products = await Product.find()
    .limit(20)
    .sort({ brand: 1 })
    .select(["-_id", "-__v"]);
  res.send(products);
});

router.get("/brand-z-a", async (req, res) => {
  const products = await Product.find()
    .limit(20)
    .sort({ brand: -1 })
    .select(["-_id", "-__v"]);
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.findOne({ barcode: req.body.barcode });
  if (product) return res.status(400).send("Barcode already registered.");

  product = new Product({
    barcode: req.body.barcode,
    brand: req.body.brand,
    name: req.body.name
  });

  product = await product.save();

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let scanCode = await Product.findOne({ barcode: req.body.barcode });
  // if (scanCode) return res.status(400).send("Barcode already registered.");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { barcode: req.body.barcode, brand: req.body.brand, name: req.body.name },
    {
      new: true
    }
  );

  if (!product)
    return res
      .status(404)
      .send("The product with the given name was not found.");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
