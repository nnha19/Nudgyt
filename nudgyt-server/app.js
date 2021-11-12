const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(userRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.log(err));

app.listen(PORT, function () {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});
