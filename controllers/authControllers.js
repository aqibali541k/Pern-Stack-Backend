const { sql } = require("../config/db");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            age,
            password,
            profilePic
        } = req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !age ||
            !password
        ) {
            return res.status(400).json({
                message: "All Fields Are Required"
            });
        }

        const UserAlreadyExists = await sql.query`
            SELECT * FROM Auth
            WHERE Email = ${email}
               OR Phone = ${phone}
        `;

        if (UserAlreadyExists.recordset.length > 0) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await sql.query`
            INSERT INTO Auth
            (
                Name,
                Email,
                Phone,
                Age,
                Password,
                ProfilePic
            )
            VALUES
            (
                ${name},
                ${email},
                ${phone},
                ${age},
                ${hashedPassword},
                ${profilePic}
            )
        `;

        res.status(201).json({
            message: "User Registered Successfully"
        });

    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const Login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "All Fields Are Required"
        });
    }
    const UserAlreadyExists = await sql.query`SELECT * FROM Auth WHERE Email=${email}`
    if (UserAlreadyExists.recordset.length == 0) {
        res.status(401).json({
            message: "Invalid email or Password"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, UserAlreadyExists.recordset[0].Password)
    if (!isPasswordValid) {
        res.status(400).json({
            message: "Invalid Password"
        });

    }
    const token = jwt.sign({ id: UserAlreadyExists.recordset[0].Id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.status(200).json({
        message: "User Login Successfully",
        token
    });
}

const getUsers = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Auth `
        res.json(result.recordset)
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
module.exports = { register, getUsers, Login }