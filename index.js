'use strict';

var Plugin = {};
var User = require.main.require('./src/user');
var Helpers = require.main.require('./src/controllers/helpers');

Plugin.init = function (params, callback) {

  params.router.get('/user/:username', async (req, res, next) => {
    var uid = await User.getUidByUserslug(req.params.username)
    var userData = await User.getUserData(uid);
    if (userData && userData.website) {
      Helpers.redirect(res, userData.website);
    } else {
        next();
    }
  });

  callback();
};

Plugin.redirect = async (data, callback) => {
      
  var req = data.req;
  var res = data.res;
  var route = req.route;

  if (route.path === '/api/user/:userslug') {
    var uid = await User.getUidByUserslug(req.params.userslug)
    var userData = await User.getUserData(uid);
    if (userData && userData.website) {
      Helpers.redirect(res, userData.website);
    }
  }
};

module.exports = Plugin;
