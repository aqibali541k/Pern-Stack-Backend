const express = require("express");
const router = express.Router();


const { register, getUsers, Login } = require("../controllers/authControllers");

// Create user
router.post("/", register)
router.get("/", getUsers)
router.post("/login", Login)

module.exports = router;