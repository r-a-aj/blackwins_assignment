const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`\n MONGODB connected! DB HOST: ${connectionDB.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
