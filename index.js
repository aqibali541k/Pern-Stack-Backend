require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const { connectDB } = require("./config/db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// app.get("/", (req, res) => {
//   res.send("Backend Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server Running On Port ${PORT}`);
// });