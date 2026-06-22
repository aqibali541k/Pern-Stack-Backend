const { sql } = require("../config/db");
const bcrypt = require("bcryptjs")

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
module.exports = { register }