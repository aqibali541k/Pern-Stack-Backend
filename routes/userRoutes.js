const express = require("express");
const router = express.Router();

const {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById
} = require("../controllers/userControllers");

// Create user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);
// Get single user by ID
router.get("/:id", getUserById);

module.exports = router;