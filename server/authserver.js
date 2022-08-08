require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authroute = require("./routes/authroute");
app.use("/auth", authroute);

const AUTH_PORT = process.env.AUTH_PORT || 5003;
app.listen(AUTH_PORT, () => {
  console.log(`listening to port ${AUTH_PORT}`);
});
