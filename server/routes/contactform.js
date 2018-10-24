const express = require('express');
const { ContactForm } = require('../models');

const router = express.Router();

//
router.route('/')
    // get first 10 contact form submissions
    .get((req, res) => {
        var opt = {limit: 10};
        if (req.params.name) {
            opt.where= {
                name: req.params.name
            }
        }
        ContactForm.findAll(opt).then((contactforms) => {
            res.json({
                contactforms,
            });
        });
    })

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

// query by id
router.route('/:id')
    // get a specific contact form submission by id
    .get((req, res) => {
        ContactForm.findById(req.params.id).then((contactform) => {
            res.json(contactform);
        });
    })

    // delete a specific contact form submission by id
    .delete((req, res) => {
        const idToDelete = req.params.id;
        ContactForm.findById(idToDelete).then((contactform) => {
            contactform.destroy().then(() => {
                res.json({ delete: true });
            });
        });
    })

module.exports = router;
