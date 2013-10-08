var express  = require('express');
var nodepi   = require(__dirname + '/nodepi');

var app = express();

var filter = function filter(req, res) {
  return (/json|text|javascript|svg|html/).test(res.getHeader('Content-Type'));
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
      var captures = fn.exec(String(val));
      if (captures) {
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
  nodepi.getLatestBuildLinks().then(function(links) {
    res.render('main', { versions: links, mode: process.argv[2] || 'dev' });
  });
});

app.listen(app.get('port'));

console.log('listening on port ' + app.get('port') + '...');



