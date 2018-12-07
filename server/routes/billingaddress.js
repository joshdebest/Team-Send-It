const express = require('express');
const { BillingAddress } = require('../models');

const router = express.Router();

router.route('/:id')
    .get((req, res) => {
        // find the billing address of a specific order
        BillingAddress.findOne({ where: { OrderId: req.params.id } }).then((billingaddress) => {
            res.json(billingaddress);
        })
    })

module.exports = router;
