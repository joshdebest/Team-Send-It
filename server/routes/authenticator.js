const { Session, AdminUser } = require('../models');

const Auth = {
  login: (username, password) =>
    AdminUser.findOne({ where: { username } }).then(adminuser => {
      if (adminuser && adminuser.Password === password) {
        return adminuser.getSession().then(session => {
          let foundSession = session;
          if (!foundSession) {
            foundSession = Session.build();
          }
          foundSession.expiration = new Date(new Date().getTime() + 30 * 60000);
          foundSession.save().then(updatedSession => adminuser.setSession(updatedSession));
          return foundSession;
      });
      }
      return Promise.reject(new Error('Incorrect Email or Password'));
    }),
  logout: adminuser =>
    adminuser.getSession().then(session => {
      if (session) {
        return session.destroy().then(() => true);
      }
      return Promise.resolve(true);
    }),
  isAuthenticated: adminuser =>
    adminuser.getSession().then(
      session => {
        if (session) {
          if (session.expiration.getTime() > new Date().getTime()) {
            const updateSession = session;
            updateSession.expiration = new Date(new Date().getTime() + 30 * 60000);
            return session.save().then(() => true);
          }
          return this.logout(adminuser).then(() => false);
        }
        return false;
      },
      () => false
    )
};

module.exports = Auth;
