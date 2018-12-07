const express = require('express');
const { Order } = require('../models');
const { Product } = require('../models');
const { BillingAddress } = require('../models');

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
            Total,
            Address,
            Products
        } = req.body;

        const newOrder = Order.build({
            CustomerName,
            Email,
            DateOrdered,
            TrackingNumber,
            OrderNumber,
            Status,
            Total
        });

        newOrder.save().then(() => {
            // add the billing address to the order
            BillingAddress.create({
                Street: Address.street,
                City: Address.city,
                State: Address.state,
                Zipcode: Address.zipcode
            }).then(billingaddress => {
                newOrder.setBillingAddress(billingaddress);
                newOrder.save();

                // add all the products to the order
                for (var i = 0; i < Products.length; i++) {
                    const id = Products[i].id;
                    const price = Math.round((Products[i].Price * Products[i].Qty)*100) / 100;
                    const quantity = Products[i].Qty;

                    newOrder.createProductOrder({
                        Price: price,
                        Qty: quantity,
                        Date: DateOrdered,
                        ProductId: id
                    });
                    newOrder.save();

                    // update stock of product
                    Product.findById(id).then((product) => {
                        const productToUpdate = product;
                        productToUpdate.Qty = productToUpdate.Qty - quantity;
                        productToUpdate.save();
                    });
                }
            });

            res.json(newOrder);
        })
    });

// query by id
router.route('/:id')
    // get a specific order by id
    .get((req, res) => {
        Order.findById(req.params.id).then((order) => {
            // get the billing address of the order
            order.getBillingAddress().then((billingaddress) => {
                // get all the products in the order
                order.getProductOrders().then((productorders) => {
                    res.json({
                        order: order,
                        billingaddress: billingaddress,
                        productorders: productorders
                    });
                });
            });
        });
    })

    // update an order by specific id
    .put((req, res) => {
        const idToUpdate = req.params.id;
        const Status = req.body.Status;

        // update the status of the order
        Order.findById(idToUpdate).then(order => {
            const orderToUpdate = order;
            orderToUpdate.Status = Status;
            orderToUpdate.save().then((updatedOrder) => {
                res.json(updatedOrder);
            })
        })
    })

module.exports = router;
