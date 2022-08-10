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

//Create a new plant
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
      userId,
    } = req.body;

    const newPost = await prisma.plant.create({
      data: {
        name,
        description,
        type,
        location,
        water_freq,
        fertilise_freq,
        repot_freq,
        author: { connect: { id: userId } },
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

//Show a plant
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await prisma.plant.findFirst({
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

//Update a plant
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

//Delete a plant
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await prisma.plant.delete({
      where: {
        id: id,
      },
    });
    console.log(deletePost);
    res.json(deletePost);
  } catch (error) {
    console.log("DELETE/ plant", error);
    res.status(401).json({
      status: "error",
      message: "plant not able to be deleted",
    });
  }
});

//Add a plant action
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, action_date } = req.body;
    const newAction = await prisma.action.create({
      data: {
        type,
        action_date,
        plant: { connect: { id: id } }, //id value is the plantId
      },
    });
    console.log(newAction)
    res.json(newAction);
  } catch (error) {
    console.log("POST/create action", error);
    res.status(401).json({
      status: "error",
      message: "plant action not created",
    });
  }
});

//Show plant actions
router.get("/action/:id", auth, async (req, res) => {
  try {
    const { id } = req.params; //id here ˜is plantId
    const plantActions = await prisma.plant.findFirst({
      where: { id: id },
      select: { action: true },
    });
    res.json(plantActions);
  } catch (error) {
    console.log("GET/ plantAction", error);
    res.status(401).json({
      status: "error",
      message: "plantActions not able to be fetched",
    });
  }
});

//Delete plant action
router.delete("/action/:id", auth, async (req, res) => {
  try {
    const { id } = req.params; //id here is action id
    const deletedAction = await prisma.action.delete({
      where: {
        id: id,
      },
    });
    res.json(deletedAction);
  } catch (error) {
    console.log("DELETE/ plantaction", error);
    res.status(401).json({
      status: "error",
      message: "plantAction not able to be deleted",
    });
  }
});

module.exports = router;
