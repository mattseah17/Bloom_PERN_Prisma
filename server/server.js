require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const user = require("./routes/user");
app.use("/user", user);

const plant = require("./routes/plant");
app.use("/plant", plant);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
