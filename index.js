var payload = require('request-payload');

var receiveJSON = function(req, opts, cb) {
  if (typeof opts === 'function') return receiveJSON(req, {}, opts);

  payload(req, opts, function(raw) {
    try {
      cb(null, JSON.parse(raw));
    } catch(err) {
      cb(err);
    }
  });
};

module.exports = receiveJSON;
