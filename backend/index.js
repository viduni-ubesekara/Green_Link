const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyparser=require("body-parser");
const inventoryRoutes = require("./inventoryControl/inventoryRoutes/routes");
const cartRoutes = require("./inventoryControl/inventoryRoutes/cartRoutes");

// Middleware section
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

// MongoDB connection implementation
mongoose
  .connect(
    "mongodb+srv://nipunasachintha0022:mongotech123@inspiredtech.t0szwrd.mongodb.net/inspiredTech?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Start the server
const port = 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// All the routes
app.use('/inventoryPanel', inventoryRoutes); // For all the Inventory Control Panel routes
app.use("/cart", cartRoutes);
