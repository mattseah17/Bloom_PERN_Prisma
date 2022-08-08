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

// //User Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await prisma.user.findUnique({ email: email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ status: "error", message: "not authorised" });
//     }

//     const result = await bcrypt.compare(req.body.password, user.hash);
//     if (!result) {
//       console.log("email or password error");
//       return res.status(401).json({ status: "error", message: "Login failed" });
//     }

//     const payload = {
//       id: user.id,
//       email: user.email,
//     };

//     const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
//       expiresIn: "20m",
//       jwtid: uuidv4(),
//     });

//     const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
//       expiresIn: "30d",
//       jwtid: uuidv4(),
//     });

//     const response = { access, refresh };

//     res.json(response);
//   } catch (error) {
//     console.log("POST /login", error);
//     res.status(400).json({ status: "error", message: "login failed" });
//   }
// });

// //Refresh token
// router.post("/refresh", (req, res) => {
//   try {
//     const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
//     console.log(decoded);

//     const payload = {
//       id: decoded.id,
//       email: decoded.email,
//     };

//     const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
//       expiresIn: "20m",
//       jwtid: uuidv4(),
//     });

//     const response = { access };
//     res.json(response);
//   } catch (error) {
//     console.log("POST/refresh", error);
//     res.status(401).json({
//       status: "error",
//       message: "unauthorised",
//     });
//   }
// });
