const { sql } = require("../config/db");

// CREATE USER
const createUser = async (req, res) => {
    try {
        const { name, phone, age, profilePic } = req.body;
        const UserAlreadyExists = await sql.query`SELECT * From Users WHERE Phone=${phone}`
        if (UserAlreadyExists.recordset.length > 0) {
            return res.status(400).json({ message: "User already exists" })
        }

        const result = await sql.query`
      INSERT INTO Users (Name, Phone, Age, ProfilePic)
      VALUES (${name}, ${phone}, ${age}, ${profilePic});

      SELECT SCOPE_IDENTITY() AS Id;
    `;

        res.json({
            message: "User created successfully",
            userId: result.recordset[0].Id
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL USERS
const getUsers = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;

        res.json(result.recordset);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await sql.query`
            SELECT * FROM Users WHERE Id = ${id}
        `;

        if (user.recordset.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, age, profilePic } = req.body;
        const UserAlreadyExists = await sql.query`SELECT * From Users WHERE Phone=${phone} AND Id != ${id}`
        if (UserAlreadyExists.recordset.length > 0) {
            return res.status(400).json({ message: "User already exists" })
        }
        const result = await sql.query`
      UPDATE Users
      SET Name = ${name},
          Phone = ${phone},
          Age = ${age},
          ProfilePic = ${profilePic}
      WHERE Id = ${id};
    `;
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`
    DELETE FROM Users
    WHERE Id = ${id};
    `;
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById
};