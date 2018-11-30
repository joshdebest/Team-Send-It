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
            // get the billing address of each order
            var billingaddresses = Array();
            for (var i = 0; i < orders.length; i++) {
                orders[i].getBillingAddress().then(billingaddress => {
                    billingaddresses.push(billingaddress);
                })
            }

            res.json({
                orders: orders,
                billingaddresses: billingaddresses
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
            productIdList,
            quantityList
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
            })

            // add all the products to the order
            for (var i = 0; i < productIdList.length; i++) {
                const idToAdd = productIdList[i];

                Product.findById(idToAdd).then((product) => {
                    newOrder.addProduct(product);
                    newOrder.save();
                });
            }

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
                order.getProductOrders().then((productIds) => {
                    var products = Array();

                    for (var i = 0; i < productIds.length; i++) {
                        Product.findById(productIds[i].ProductId).then(item => {
                            const product = {
                                name: item.Name,
                                qty: productIds.Qty,
                                price: item.Price
                            }

                            products.push(product);
                        })
                    }

                    res.json({
                        order: order,
                        billingaddress: billingaddress,
                        products: products
                    });
                });
            });
        });
    })

    // update an order by specific id
    .put((req, res) => {
        const idToUpdate = req.params.id;
        const { Status } = req.body;

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
