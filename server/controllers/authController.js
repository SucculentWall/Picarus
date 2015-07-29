module.exports = {

  logout: function (req, res, next) {
    req.logout();
    res.status(200).send('server successfully logged out user');
  }

};