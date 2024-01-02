const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

//Variables

const app = express();
const { DB_PASS, DB_USER, DB_NAME } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.whlii.mongodb.net/testing`;

//middlewares

app.use(express.json());
app.use(cors());
app.use("/images", express.static("assets/images"));

//routes
app.use("/api/admin/admin-user", require("./routes/user.route"));
app.use("/api/admin/category", require("./routes/categories.route"));
app.use("/api/admin/product", require("./routes/products.route"));

mongoose.connect(uri, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to database");
  }
});

app.listen(8000, () => {
  console.log("The server is started...!!");
});
