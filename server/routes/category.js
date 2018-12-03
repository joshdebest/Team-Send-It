const express = require('express');
const { Category } = require('../models');
const { ProductCategory } = require('../models');

const router = express.Router();

router.route('/')
    // get all categories
    .get((req, res) => {
        Category.findAll().then((categories) => {
            res.json({
                categories,
            });
        });
    })

    // create a category
    .post((req, res) => {
        const {
            Name
        } = req.body;
        Category.create({
            Name
        }).then((category) => {
            res.json(category);
        });
    })

router.route('/:id')
    // get a specific category by id
    .get((req, res) => {
        const categoryId = req.params.id;
        Category.findById(categoryId).then((category) => {
            res.json(category);
        });
    })

    // update a specific category by their id
    .put((req, res) => {
        const categoryId = req.params.id;
        const { Name } = req.body;
        Category.findById(categoryId).then((category) => {
            const categoryToUpdate = category;
            categoryToUpdate.Name = Name;
            categoryToUpdate.save().then((updatedCategory) => {
                res.json(updatedCategory);
            });
        });
    })

    // delete a specific admin or employee by their id
    .delete((req, res) => {
        const idToDelete = req.params.id;

        // remove all rows from inner table that are tied to Category to be removed
        ProductCategory.findAll({ where: { CategoryId: idToDelete } }).then((categories) => {
            for (var i = 0; i < categories.length; i++) {
                categories[i].destroy();
            }

            Category.findById(idToDelete).then((category) => {
                category.destroy().then(() => {
                    res.json({ delete: true });
                });
            });
        })
    })

module.exports = router;
