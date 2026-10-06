const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const contactRoutes = require("./routes/contactRoutes");

app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
    res.send("Smart Contact Manager API is running");
});

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});