const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// GET all contacts
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ADD contact
router.post("/", async (req, res) => {
    try {
        const contact = new Contact(req.body);

        const savedContact = await contact.save();

        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE contact
router.delete("/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);

        res.json({
            message: "Contact deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE contact
router.put("/:id", async (req, res) => {
    try {
        const updatedContact =
            await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;