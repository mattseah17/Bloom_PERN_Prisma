require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const user = require("./routes/user");
const plant = require("./routes/plant");

app.use("/user", user);
app.use("/plant", plant);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
