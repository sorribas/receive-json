receive-json
===============

[![build status](https://secure.travis-ci.org/sorribas/receive-json.png)](http://travis-ci.org/sorribas/receive-json)

Receive JSON over an HTTP request.

## Install

```
npm install receive-json
```

## Usage

Example

```js
var http = require('http');
var onjson = require('receive-json');

http.createServer(function(req, res) {
  onjson(req, function(err, body) {
    if (err) {
      res.statusCode = 400;
      return res.end('oh no!');
    }
    res.end('awesome!');
  });
}).listen(3000);
```

The following example uses the `limit` option, which allows you to limit the size of the payload
to prevent users from overcharging your server. The limit is passed as number of bytes.

```js
var http = require('http');
var onjson = require('receive-json');

http.createServer(function(req, res) {
  onjson(req, {limit: 10000}, function(err, body) {
    if (err) {
      res.statusCode = 400;
      return res.end('oh no!');
    }
    res.end('awesome!');
  });
}).listen(3000);
```
