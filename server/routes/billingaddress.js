const express = require('express');
const { BillingAddress } = require('../models');

const router = express.Router();

//
router.route('/')
    // get first 10 billing address entries
    .get((req, res) => {
        var opt = {limit: 10};
        BillingAddress.findAll(opt).then((billingaddresses) => {
            res.json({
                billingaddresses,
            });
        });
    })

    // create a new billing address entry
    .post((req, res) => {
        const {
            Street,
            City,
            State,
            Zipcode,
        } = req.body;
        // validate potentially here
        BillingAddress.create({
            Street,
            City,
            State,
            Zipcode,
        }).then((billingaddress) => {
            res.json(billingaddress);
        });
    });

// query by id
router.route('/:id')
    // get a specific billing address by id
    .get((req, res) => {
        BillingAddress.findById(req.params.id).then((billingaddress) => {
            res.json(billingaddress);
        });
    })

    .put((req, res) => {
        const { Street, City, State, Zipcode } = req.body;
        BillingAddress.findById(req.params.id).then((billingaddress) => {
            const billingaddressToUpdate = billingaddress;
            billingaddressToUpdate.Street = Street;
            billingaddressToUpdate.City = City;
            billingaddressToUpdate.State = State;
            billingaddressToUpdate.Zipcode = Zipcode;
            billingaddressToUpdate.save().then((updatedBillingAddress) => {
                res.json(updatedBillingAddress);
            });
        });
    })

    // delete a specific billing address by id
    .delete((req, res) => {
        const idToDelete = req.params.id;
        BillingAddress.findById(idToDelete).then((billingaddress) => {
            billingaddress.destroy().then(() => {
                res.json({ delete: true });
            });
        });
    })

module.exports = router;
