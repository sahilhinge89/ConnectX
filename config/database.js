const mongoose  = require('mongoose');
require('dotenv').config();
exports.connect =()=>{

    mongoose.connect(process.env.MONGODB_URI ) .then(() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1);
    });
}
