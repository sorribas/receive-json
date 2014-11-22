var payload = require('request-payload');
var xtend = require('xtend');

var receiveJSON = function(req, opts, cb) {
  if (typeof opts === 'function') return receiveJSON(req, {}, opts);

  payload(req, opts, function(raw) {
    try {
      raw = JSON.parse(raw);
    } catch(err) {
      return cb(err);
    }
    cb(null, raw);
  });
};

receiveJSON.defaults = function(defaultOpts) {
  var fn = function(req, opts, cb) {
    if (typeof opts === 'function') return fn(req, {}, opts);
    opts = xtend(defaultOpts, opts); 
    receiveJSON(req, opts, cb);
  };

  return fn;
};

module.exports = receiveJSON;
