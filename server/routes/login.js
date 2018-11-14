const express = require('express');
const Auth = require('./authenticator');

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const username = req.body.Username;
    const password = req.body.Password;
    Auth.login(username, password).then(
      session => {
        if (session) {
          session.getAdminUser().then(adminuser => {
            res.json({ AdminUserId: adminuser.id });
          });
        }
        else {
          res.json({ error: 'You are not logged in' });
        }
      },
      error => {
        res.json({ error: error.message });
      }
    );
  });

module.exports = router;
