var express  = require('express');
var nodepi   = require(__dirname + '/nodepi');

var app = express();

var urls = [{ id: 817, href: 'http://nodejs.org/dist/v0.8.17/node-v0.8.17-linux-arm-pi.tar.gz', label: 'v0.8.17'}, { id: 818, href: 'http://nodejs.org/dist/v0.8.18/node-v0.8.18-linux-arm-pi.tar.gz', label: 'v0.8.18'}, { id: 819, href: 'http://nodejs.org/dist/v0.8.19/node-v0.8.19-linux-arm-pi.tar.gz', label: 'v0.8.19'}, { id: 820, href: 'http://nodejs.org/dist/v0.8.20/node-v0.8.20-linux-arm-pi.tar.gz', label: 'v0.8.20'}, { id: 821, href: 'http://nodejs.org/dist/v0.8.21/node-v0.8.21-linux-arm-pi.tar.gz', label: 'v0.8.21'}, { id: 822, href: 'http://nodejs.org/dist/v0.8.22/node-v0.8.22-linux-arm-pi.tar.gz', label: 'v0.8.22'}, { id: 907, href: 'http://nodejs.org/dist/v0.9.7/node-v0.9.7-linux-arm-pi.tar.gz', label: 'v0.9.7'}, { id: 908, href: 'http://nodejs.org/dist/v0.9.8/node-v0.9.8-linux-arm-pi.tar.gz', label: 'v0.9.8'}, { id: 909, href: 'http://nodejs.org/dist/v0.9.9/node-v0.9.9-linux-arm-pi.tar.gz', label: 'v0.9.9'}, { id: 910, href: 'http://nodejs.org/dist/v0.9.10/node-v0.9.10-linux-arm-pi.tar.gz', label: 'v0.9.10'}, { id: 911, href: 'http://nodejs.org/dist/v0.9.11/node-v0.9.11-linux-arm-pi.tar.gz', label: 'v0.9.11'}, { id: 912, href: 'http://nodejs.org/dist/v0.9.12/node-v0.9.12-linux-arm-pi.tar.gz', label: 'v0.9.12'}, { id: 1000, href: 'http://nodejs.org/dist/v0.10.0/node-v0.10.0-linux-arm-pi.tar.gz', label: 'v0.10.0'}, { id: 1001, href: 'http://nodejs.org/dist/v0.10.1/node-v0.10.1-linux-arm-pi.tar.gz', label: 'v0.10.1'}, { id: 1002, href: 'http://nodejs.org/dist/v0.10.2/node-v0.10.2-linux-arm-pi.tar.gz', label: 'v0.10.2'}, { id: 1003, href: 'http://nodejs.org/dist/v0.10.3/node-v0.10.3-linux-arm-pi.tar.gz', label: 'v0.10.3'}, { id: 1004, href: 'http://nodejs.org/dist/v0.10.4/node-v0.10.4-linux-arm-pi.tar.gz', label: 'v0.10.4'}, { id: 1005, href: 'http://nodejs.org/dist/v0.10.5/node-v0.10.5-linux-arm-pi.tar.gz', label: 'v0.10.5'}, { id: 1006, href: 'http://nodejs.org/dist/v0.10.6/node-v0.10.6-linux-arm-pi.tar.gz', label: 'v0.10.6'}, { id: 1007, href: 'http://nodejs.org/dist/v0.10.7/node-v0.10.7-linux-arm-pi.tar.gz', label: 'v0.10.7'}, { id: 1008, href: 'http://nodejs.org/dist/v0.10.8/node-v0.10.8-linux-arm-pi.tar.gz', label: 'v0.10.8'}, { id: 1009, href: 'http://nodejs.org/dist/v0.10.9/node-v0.10.9-linux-arm-pi.tar.gz', label: 'v0.10.9'}, { id: 1010, href: 'http://nodejs.org/dist/v0.10.10/node-v0.10.10-linux-arm-pi.tar.gz', label: 'v0.10.10'}, { id: 1011, href: 'http://nodejs.org/dist/v0.10.11/node-v0.10.11-linux-arm-pi.tar.gz', label: 'v0.10.11'}, { id: 1012, href: 'http://nodejs.org/dist/v0.10.12/node-v0.10.12-linux-arm-pi.tar.gz', label: 'v0.10.12'}, { id: 1013, href: 'http://nodejs.org/dist/v0.10.13/node-v0.10.13-linux-arm-pi.tar.gz', label: 'v0.10.13'}, { id: 1014, href: 'http://nodejs.org/dist/v0.10.14/node-v0.10.14-linux-arm-pi.tar.gz', label: 'v0.10.14'}, { id: 1015, href: 'http://nodejs.org/dist/v0.10.15/node-v0.10.15-linux-arm-pi.tar.gz', label: 'v0.10.15'}, { id: 1016, href: 'http://nodejs.org/dist/v0.10.16/node-v0.10.16-linux-arm-pi.tar.gz', label: 'v0.10.16'}, { id: 1017, href: 'http://nodejs.org/dist/v0.10.17/node-v0.10.17-linux-arm-pi.tar.gz', label: 'v0.10.17'}, { id: 1100, href: 'http://nodejs.org/dist/v0.11.0/node-v0.11.0-linux-arm-pi.tar.gz', label: 'v0.11.0'}, { id: 1101, href: 'http://nodejs.org/dist/v0.11.1/node-v0.11.1-linux-arm-pi.tar.gz', label: 'v0.11.1'}, { id: 1102, href: 'http://nodejs.org/dist/v0.11.2/node-v0.11.2-linux-arm-pi.tar.gz', label: 'v0.11.2'}, { id: 1103 ,    href: 'http://nodejs.org/dist/v0.11.3/node-v0.11.3-linux-arm-pi.tar.gz',    label: 'v0.11.3'}, { id: 1104, href: 'http://nodejs.org/dist/v0.11.4/node-v0.11.4-linux-arm-pi.tar.gz', label: 'v0.11.4'}, { id: 1105, href: 'http://nodejs.org/dist/v0.11.5/node-v0.11.5-linux-arm-pi.tar.gz', label: 'v0.11.5'}, { id: 1106, href: 'http://nodejs.org/dist/v0.11.6/node-v0.11.6-linux-arm-pi.tar.gz', label: 'v0.11.6' } ];

var filter = function filter(req, res) {
  return /json|text|javascript|svg|html/.test(res.getHeader('Content-Type'));
};

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/templates');
  app.set('view engine', 'jade');

  app.use(express.compress({ filter: filter }));
  app.use(express.static(__dirname + '/app'));
});

app.param(function(name, fn) {
  if (fn instanceof RegExp) {
    return function(req, res, next, val) {
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    };
  }
});

app.param('version', /v(\d+)\.(\d+)\.(\d+)/);
app.get('/:version', function(req, res) {
  var version = req.params.version[0];

  nodepi.getLinkToBuildFile(version).then(function(v) {
    res.redirect(v.href);
  });
});

app.get('/', function(req, res) {
  res.render('main', { versions: urls, mode: process.argv[2] || 'dev' });
});

app.listen(app.get('port'));

console.log('listening on port ' + app.get('port') + '...');



