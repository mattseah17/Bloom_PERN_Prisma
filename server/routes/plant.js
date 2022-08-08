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

//Create new plant
router.post("/create", auth, async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      location,
      water_freq,
      fertilise_freq,
      repot_freq,
    } = req.body;
    const newPost = await prisma.plant.create({
      data: {
        name: name,
        description: description,
        type: type,
        location: location,
        water_freq: water_freq,
        fertilise_freq: fertilise_freq,
        repot_freq: repot_freq,
      },
    });
    res.json(newPost);
  } catch (error) {
    console.log("POST/create", error);
    res.status(401).json({
      status: "error",
      message: "post creation not successful",
    });
  }
});

// //Show my plants
// router.get("/myList", auth, async (req, res) => {
//   try {
//     const myPosts = await prisma.user.findMany({
//       select: { posts: true },
//     });
//     res.json(myPosts);
//   } catch (error) {
//     console.log("GET/myList", error);
//     res.status(401).json({
//       status: "error",
//       message: "plants list not able to show",
//     });
//   }
// });

//Show a plant
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await prisma.plant.findUnique({
      where: { id: id },
    });
    res.json(plant);
  } catch (error) {
    console.log("GET/ plant", error);
    res.status(401).json({
      status: "error",
      message: "plant not able to show",
    });
  }
});

//Update plant
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      location,
      water_freq,
      fertilise_freq,
      repot_freq,
    } = req.body;
    const updatePost = await prisma.plant.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        type: type,
        location: location,
        water_freq: water_freq,
        fertilise_freq: fertilise_freq,
        repot_freq: repot_freq,
      },
    });
    res.json(updatePost);
  } catch (error) {
    console.log("PATCH/ plant", error);
    res.status(401).json({
      status: "error",
      message: "plant not able to be updated",
    });
  }
});

//Delete plant
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await prisma.plant.delete({
      where: {
        id: id,
      },
    });
    res.json(deletePost);
  } catch (error) {
    console.log("DELETE/ plant", error);
    res.status(401).json({
      status: "error",
      message: "plant not able to be deleted",
    });
  }
});

module.exports = router;
