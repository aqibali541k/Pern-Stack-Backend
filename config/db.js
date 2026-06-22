const sql = require("mssql");
require("dotenv").config();

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,

    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    options: {
        trustServerCertificate: true,
    },
};

const connectDB = async () => {
    try {
        await sql.connect(config);

        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Connection Error");
        console.log(error);
    }
};

module.exports = {
    sql,
    connectDB,
};