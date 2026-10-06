const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    category: {
        type: String,
        default: "Personal"
    },

    favorite: {
        type: Boolean,
        default: false
    },

    blocked: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    callCount: {
        type: Number,
        default: 0
    },

    lastCalled: {
        type: String,
        default: "Never"
    }
});

module.exports = mongoose.model("Contact", contactSchema);