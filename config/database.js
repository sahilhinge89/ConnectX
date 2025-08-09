const mongoose  = require('mongoose');
require('dotenv').config();
exports.connect =()=>{

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) .then(() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1);
    });
}
