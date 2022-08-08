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

//User register
router.post("/register", async (req, res) => {
  const user = await prisma.user.findFirst({ email: email });
  if (user) {
    return res.send({
      status: 409,
      message: "Email is linked to existing account",
    });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const { email, username, bio } = req.body;
    const newUser = await prisma.user.create({
      data: {
        email,
        hash,
        username,
        bio,
      },
    });
    console.log("created user", newUser);
    res.json({ status: "ok", message: "User registered" });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Registration error" });
  }
});

//Get user stuff
router.get("/:id", auth, async (req, res) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        posts: true,
      },
    });
    res.json(getUser);
  } catch (error) {
    console.log("GET/:id", error);
    res.status(401).json({
      status: "error",
      message: "Get profile not successful",
    });
  }
});

//Update profile
router.patch("/update", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ email: req.decoded.email });
    const updateUser = await prisma.user.update({
      where: { email: req.decoded.email },
      data: {
        email: req.body.email || user.email,
        username: req.body.username || user.username,
        bio: req.body.bio || user.bio,
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
