'use strict';

var url = require('url');


var Default = require('./twiliosttService');


module.exports.action_handler = function action_handler (req, res, next) {
  Default.action_handler(req.swagger.params, res, next);
};

module.exports.call_handler = function call_handler (req, res, next) {
  Default.call_handler(req.swagger.params, res, next);
};

module.exports.partial_handler = function partial_handler (req, res, next) {
  Default.partial_handler(req.swagger.params, res, next);
};
