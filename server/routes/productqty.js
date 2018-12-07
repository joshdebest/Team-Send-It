const express = require('express');
const { Product } = require('../models');

const router = express.Router();

router.route('/:id')
    .put((req, res) => {
        const idToUpdate = req.params.id;
        const { Quantity } = req.body;

        // update the qty of the product
        Product.findById(idToUpdate).then((product) => {
            const productToUpdate = product;
            productToUpdate.Qty = product.Qty + Quantity;
            productToUpdate.save().then((updatedProduct) => {
                res.json(updatedProduct);
            })
        })
    })

module.exports = router;
