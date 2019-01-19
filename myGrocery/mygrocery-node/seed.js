const { Product } = require("./models/product");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  [
    { barcode: 10000, brand: "Nestle", name: "Milo 3-in-1" },
    { barcode: 10001, brand: "Nestle", name: "Milo Powder" },
    { barcode: 10002, brand: "Nestle", name: "Ali Coconut" },
    { barcode: 10003, brand: "Nestle", name: "Berry Ice-Cream" },
    { barcode: 10004, brand: "Nestle", name: "Strawberry Cake" },
    { barcode: 10005, brand: "Nestle", name: "Chocolate Milk" },
    { barcode: 10006, brand: "Nestle", name: "Pure Milk" },
    { barcode: 10007, brand: "Nestle", name: "Nugget Milo" },
    { barcode: 10008, brand: "Nestle", name: "Dinosaur Biscuit" },
    { barcode: 10009, brand: "Nestle", name: "Papaya Juice" },
    { barcode: 10010, brand: "Nestle", name: "Red Balloon" },
    { barcode: 10011, brand: "Nestle", name: "Freddy Great" },
    { barcode: 10012, brand: "Liberty", name: "Walnut" },
    { barcode: 10013, brand: "Liberty", name: "White Walnut" },
    { barcode: 10014, brand: "Liberty", name: "Black Walnut" },
    { barcode: 10015, brand: "Liberty", name: "Rainbow Walnut" },
    { barcode: 10016, brand: "Liberty", name: "Expensive Walnut" },
    { barcode: 10017, brand: "Liberty", name: "Organic Brocolli" },
    { barcode: 10018, brand: "Liberty", name: "Raw Meat" },
    { barcode: 10019, brand: "Liberty", name: "Chicken Tights" },
    { barcode: 10020, brand: "Liberty", name: "Fried Chicken" },
    { barcode: 10021, brand: "Liberty", name: "French Fries" },
    { barcode: 10022, brand: "Liberty", name: "Donuts" },
    { barcode: 10023, brand: "Liberty", name: "Raw Meat123" },
    { barcode: 10024, brand: "Liberty", name: "Chicken Tights123" },
    { barcode: 10025, brand: "Liberty", name: "Fried Chicken123" },
    { barcode: 10026, brand: "Liberty", name: "French Fries123" },
    { barcode: 10027, brand: "Liberty", name: "Donuts123" }
  ]
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Product.deleteMany({});

  for (let prod of data) {
    const products = prod.map(p => ({ ...p }));

    await Product.insertMany(products);
  }

  mongoose.disconnect();

  console.info("Data Import Done!");
}

seed();
