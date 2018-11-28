const express = require('express');
const { Product } = require('../models');

const router = express.Router();

//
router.route('/')
    // get first 10 products
    .get((req, res) => {
        var opt = {limit: 10};
        Product.findAll(opt).then((products) => {
            res.json({
                products,
            });
        });
    })

    // create a new product
    .post((req, res) => {
        const {
            Name,
            Price,
            Qty,
            Description,
            ImageLink
        } = req.body;
        // validate potentially here
        Product.create({
            Name,
            Price,
            Qty,
            Description,
            ImageLink
        }).then((product) => {
            res.json(product);
        });
    });

// query by id
router.route('/:id')
    // get a specific product by id
    .get((req, res) => {
        Product.findById(req.params.id).then((product) => {
            res.json(product);
        });
    })

    .put((req, res) => {
        const { Name, Price, Qty, Description, ImageLink } = req.body;
        Product.findById(req.params.id).then(product => {
            const productToUpdate = product;
            productToUpdate.Name = Name;
            productToUpdate.Price = Price;
            productToUpdate.Qty = Qty;
            productToUpdate.Description = Description;
            productToUpdate.ImageLink = ImageLink;
            productToUpdate.save().then((updatedProduct) => {
                res.json(updatedProduct);
            });
        });
    })

    // delete a specific product by id
    .delete((req, res) => {
        const idToDelete = req.params.id;
        Product.findById(idToDelete).then((product) => {
            product.destroy().then(() => {
                res.json({ delete: true });
            });
        });
    })

module.exports = router;
