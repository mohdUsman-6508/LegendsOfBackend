import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const app = express();
//body parser use kar rahe hai create functionality karane ke liye
//iska jarurat ab nahi pad raha
app.use(bodyParser.json());
app.use(express.json());

//create server

app.get("/", (req, res) => {
  res.send("RESTful Api");
});

app.listen(4500, () => {
  console.log("Listening at 4500");
});

//connect to mongodb
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected to mongoDB;)");
  })
  .catch((err) => console.log(err));

//create schema,model and api
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = new mongoose.model("Product", productSchema);

/// C ->create
app.post("/api/v1/product/new", async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

/// R ->read

app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

/// U ->update

app.put("/api/v1/product/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.send(200).json({
    success: true,
    product,
  });
});

/// D -> delete

app.delete("/api/v1/product/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Product.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }
    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});
