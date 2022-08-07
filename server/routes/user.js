require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");

//Register an account
router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const { email, first_name, last_name, username } = req.body;
    const newUser = await prisma.user.create({
      data: {
        email,
        hash,
        first_name,
        last_name,
        username,
      },
    });
    console.log("created user", newUser);
    res.json({ status: "ok", message: "user registered" });
  } catch (error) {
    res.status(400).json({ status: "error", message: "registration error" });
  }
});

//User Login
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, user.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", message: "login failed" });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    const response = { access, refresh };

    res.json(response);
  } catch (error) {
    console.log("POST /login", error);
    res.status(400).json({ status: "error", message: "login failed" });
  }
});

//Refresh token
router.post("/refresh", (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    console.log(decoded);

    const payload = {
      id: decoded.id,
      email: decoded.email,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const response = { access };
    res.json(response);
  } catch (error) {
    console.log("POST/refresh", error);
    res.status(401).json({
      status: "error",
      message: "unauthorised",
    });
  }
});

//Update profile
router.patch("/update", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ email: req.decoded.email });
    const updateUser = await prisma.user.update({
      where: { email: req.decoded.email },
      data: {
        email: req.body.email || user.email,
        first_name: req.body.first_name || user.first_name,
        last_name: req.body.last_name || user.last_name,
        username: req.body.username || user.username,
      },
    });
    res.json(updateUser);
  } catch (error) {
    console.log("PATCH/update", error);
    res.status(401).json({
      status: "error",
      message: "update profile not successful",
    });
  }
});

module.exports = router;
