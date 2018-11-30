const express = require('express');
const { Product } = require('../models');
const { ProductCategory } = require('../models');
const { Category } = require('../models');

const router = express.Router();

//
router.route('/')
    // get all the products that are in the bikes category
    .get((req, res) => {
        Category.findOne({ where: { Name: "Accessories" } }).then((category) => {
            category.getProducts().then((products) => {
                res.json(products);
            })
        });
    });

module.exports = router;
