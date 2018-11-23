const express = require('express');
const { AdminUser } = require('../models');

const router = express.Router();

router.route('/')
    // get all admin and employee accounts
    .get((req, res) => {
        AdminUser.findAll().then((adminusers) => {
            res.json({
                adminusers,
            });
        });
    })

    // create a new admin or employee account
    .post((req, res) => {
        const {
            Name,
            Username,
            Password,
            Admin,
        } = req.body;
        AdminUser.create({
            Name,
            Username,
            Password,
            Admin,
        }).then((adminuser) => {
            res.json(adminuser);
        });
    })

router.route('/:id')
    // get a specific admin or employee by their id
    .get((req, res) => {
        const userId = req.params.id;
        AdminUser.findById(userId).then((adminuser) => {
            res.json(adminuser);
        });
    })

    // update a specific admin or employee by their id
    .put((req, res) => {
        const userId = req.params.id;
        const { Name, Username, Password, Admin } = req.body;
        AdminUser.findById(userId).then((adminuser) => {
            const adminuserToUpdate = adminuser;
            adminuserToUpdate.Name = Name;
            adminuserToUpdate.Username = Username;
            adminuserToUpdate.Password = Password;
            adminuserToUpdate.Admin = Admin;
            adminuserToUpdate.save().then((updatedAdminUser) => {
                res.json(updatedAdminUser);
            });
        });
    })

    // delete a specific admin or employee by their id
    .delete((req, res) => {
        const userId = req.params.id;
        AdminUser.findById(userId).then((adminuser) => {
            adminuser.destroy().then(() => {
                res.json({ delete: true });
            });
        });
    })

module.exports = router;
