const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    about: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String, // better as string to store leading zeros and country codes
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Profile", profileSchema);
