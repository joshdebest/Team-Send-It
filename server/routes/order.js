const express = require('express');
const { Order } = require('../models');

const router = express.Router();

//
router.route('/')
    // get all orders
    .get((req, res) => {
        Order.findAll().then((orders) => {
            res.json({
                orders,
            });
        });
    })

    // create a new order
    .post((req, res) => {
        const {
            CustomerName,
            Email,
            DateOrdered,
            TrackingNumber,
            OrderNumber,
            Status,
            Total
        } = req.body;
        // validate potentially here
        Order.create({
            CustomerName,
            Email,
            DateOrdered,
            TrackingNumber,
            OrderNumber,
            Status,
            Total
        }).then((order) => {
            res.json(order);
        });
    });

// query by id
router.route('/:id')
    // get a specific order by id
    .get((req, res) => {
        Order.findById(req.params.id).then((order) => {
            res.json(order);
        });
    })

module.exports = router;
