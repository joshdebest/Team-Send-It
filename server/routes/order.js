const express = require('express');
const { Order } = require('../models');

const router = express.Router();

//
router.route('/')
    // get first 10 orders
    .get((req, res) => {
        var opt = {limit: 10};
        if (req.body.OrderNumber) { // search by order number
            opt.where = {
                OrderNumber: req.body.OrderNumber
            }
        }
        if (req.body.TrackingNumber) {  // search by tracking number
            opt.where = {
                TrackingNumber: req.body.TrackingNumber
            }
        }
        Order.findAll(opt).then((orders) => {
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

    .put((req, res) => {
        const { CustomerName, Email, DateOrdered, TrackingNumber, OrderNumber, Status, Total } = req.body;
        Order.findById(req.params.id).then((order) => {
            const orderToUpdate = order;
            orderToUpdate.CustomerName = CustomerName;
            orderToUpdate.Email = Email;
            orderToUpdate.DateOrdered = DateOrdered;
            orderToUpdate.TrackingNumber = TrackingNumber;
            orderToUpdate.OrderNumber = OrderNumber;
            orderToUpdate.Status = Status;
            orderToUpdate.Total = Total;
            orderToUpdate.save().then((updatedOrder) => {
                res.json(updatedOrder);
            });
        });
    })

    // delete a specific order by id
    .delete((req, res) => {
        const idToDelete = req.params.id;
        Order.findById(idToDelete).then((order) => {
            order.destroy().then(() => {
                res.json({ delete: true });
            });
        });
    })

module.exports = router;
