const express = require('express');
const { Category } = require('../models');
const { Product } = require('../models');

const router = express.Router();

router.route('/:id')
    .get((req, res) => {
        Category.findById(req.params.id).then((category) => {
            category.getProducts().then((products) => {
                res.json(products);
            })
        })
    })

    .post((req, res) => {
        Product.findById(req.params.id).then((product) => {
            product.getCategories().then((categories) => {
                res.json(categories);
            })
        })
    })

module.exports = router;
