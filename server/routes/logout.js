const express = require('express');
const Auth = require('./authenticator');
const { AdminUser } = require('../models');

const router = express.Router();

router.route('/:id')
  .delete((req, res) => {
    const adminUserId = req.params.id;
    AdminUser.findById(adminUserId).then(adminUser => {
      Auth.logout(adminUser).then(response => {
        res.json(response);
      });
    });
  });

module.exports = router;
