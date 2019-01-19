const Joi = require("joi");
const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    barcode: {
      type: Number,
      required: true,
      min: 10000
    },
    brand: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

function validateProduct(product) {
  const schema = {
    barcode: Joi.number()
      .min(10000)
      .required(),
    brand: Joi.string()
      .min(5)
      .max(50)
      .required(),
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
