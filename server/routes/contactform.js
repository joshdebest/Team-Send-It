const express = require('express');
const { ContactForm } = require('../models');

const router = express.Router();

//
router.route('/')
    // create a contact form submissions
    .post((req, res) => {
        const {
            Name,
            PhoneNumber,
            Email,
            Message,
        } = req.body;
        // validate potentially here
        ContactForm.create({
            Name,
            PhoneNumber,
            Email,
            Message,
        }).then((contactform) => {
            res.json(contactform);
        });
    });

module.exports = router;
