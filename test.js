var test = require('tape');
var http = require('http');
var request = require('request');
var onjson = require('./');

var runTests = function() {
  test('basic test', function(t) {
    request.post('http://localhost:3400', {body: '{"hello": "world"}'}, function(err, res, body) {
      t.notOk(err);
      t.equal(body, '{"hello":"world"}');
      t.end();
    });
  });

  test('invalid json', function(t) {
    request.post('http://localhost:3400', {body: '{hello: "world"}'}, function(err, res, body) {
      t.equal(body, 'ka-boom!');
      t.end();
    });
  });

  test('end', function(t) {
    t.end();
    process.exit();
  });
};

var server = http.createServer(function(req, res) {
  onjson(req, function(err, json) {
    if (err) return res.end('ka-boom!');
    res.end(JSON.stringify(json));
  });
});

server.listen(3400, runTests);
