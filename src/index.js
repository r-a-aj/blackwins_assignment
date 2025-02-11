require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();


// Connect to MongoDB properly with async/await
const startServer = async () => {
    try {
        await connectDB(); // Wait for DB connection
        app.use(cors());
        app.use(express.json());
        app.use("/api/contacts", contactRoutes);
        app.use(errorHandler);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
        });
    } catch (err) {
        console.log("MongoDB connection failed! :", err);
        process.exit(1); // Exit process on DB failure
    }
};

// Start the server
startServer();