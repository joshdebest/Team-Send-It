const express = require('express');
const { Product } = require('../models');
const { Category } = require('../models');
const { ProductCategory } = require('../models');

const router = express.Router();

//
router.route('/')
    // get all products
    .get((req, res) => {
        Product.findAll().then((products) => {
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
            ImageLink,
            categoryList
        } = req.body;

        const newProduct = Product.build({
            Name,
            Price,
            Qty,
            Description,
            ImageLink,
        });

        newProduct.save().then(() => {
            for(var i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];

                Category.findOne({ where: { Name: category } }).then((cat) => {
                    newProduct.addCategory(cat);
                    newProduct.save();
                });
            }

            res.json(newProduct);
        });
    });

// query by id
router.route('/:id')
    // get a specific product by id
    .get((req, res) => {
        Product.findById(req.params.id).then((product) => {
            ProductCategory.findAll({ where: { ProductId: req.params.id } }).then((categories) => {
                const response = {
                    product: product,
                    categories: categories
                }

                res.json(response)
            });
        });
    })

    .put((req, res) => {
        const idToUpdate = req.params.id;
        const { Name, Price, Qty, Description, ImageLink, categoryList } = req.body;

        // remove products tied to product
        ProductCategory.findAll({ where: { ProductId: idToUpdate } }).then((categories) => {
            for (var i = 0; i < categories.length; i++) {
                categories[i].destroy();
            }
        });

        Product.findById(idToUpdate).then(product => {
            const productToUpdate = product;
            productToUpdate.Name = Name;
            productToUpdate.Price = Price;
            productToUpdate.Qty = Qty;
            productToUpdate.Description = Description;
            productToUpdate.ImageLink = ImageLink;
            productToUpdate.save().then((updatedProduct) => {
                // update the categories tied to product
                for(var i = 0; i < categoryList.length; i++) {
                    const category = categoryList[i];

                    Category.findOne({ where: { Name: category } }).then((cat) => {
                        productToUpdate.addCategory(cat);
                        productToUpdate.save();
                    });
                }

                res.json(updatedProduct);
            });
        });
    })

    // delete a specific product by id
    .delete((req, res) => {
        const idToDelete = req.params.id;

        // remove all rows from inner table that are tied to Product to be removed
        ProductCategory.findAll({ where: { ProductId: idToDelete } }).then((categories) => {
            for (var i = 0; i < categories.length; i++) {
                categories[i].destroy();
            }
        })

        Product.findById(idToDelete).then((product) => {
            product.destroy().then(() => {
                res.json({ delete: true });
            });
        });
    })

module.exports = router;
